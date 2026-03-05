using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_api.Commons;
using server_api.Context;
using server_api.DTOs.UserDTOs;
using server_api.Models;

namespace server_api.Services.Authentication
{
    public class AuthService
    {
        private readonly ContextDB _context;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly int _refreshTokenExpirationDays;
        private readonly IMapper _mapper;

        public AuthService(ContextDB context, IHttpContextAccessor contextAccessor, JwtService jwtService, IConfiguration configuration, IMapper mapper)
        {
            _context = context;
            _contextAccessor = contextAccessor;
            _jwtService = jwtService;
            _configuration = configuration;
            _refreshTokenExpirationDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpirationInDays"] ?? "7");
            _mapper = mapper;
        }

        public async Task<UserResponseDTO?> SignUpUser(UserSignUpRequest request)
        {
            // validação de dados e senha

            UserDataValidator.ValidateEmail(request.Email);
            UserDataValidator.ValidatePassword(request.Password);
            

            Users user = _mapper.Map<Users>(request); // converte DTO para o Model
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            // converte o Model para DTO
            var userTokenResp = _mapper.Map<UserAndTokenResponseDTO>(user);

            userTokenResp.AccessToken = _jwtService.GenerateAccessToken(user);
            string refreshTokenGen = _jwtService.GenerateRefreshToken();
            userTokenResp.RefreshToken = refreshTokenGen;
            userTokenResp.ExpiresIn = _jwtService.GetAccessTokenExpirationTime();

            await AddRefreshTokenToDatabase(user.Id, refreshTokenGen, GetUserIP());
            return userTokenResp;
        }

        public async Task<UserAndTokenResponseDTO?> LoginAsync(UserLoginRequest request)
        {
            Users? user = await _context.Users.FirstOrDefaultAsync(x => x.Username == request.UserNameOrEmail || x.Email == request.UserNameOrEmail);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password)) return null;
            string? userIp = GetUserIP();
            string accessToken = _jwtService.GenerateAccessToken(user);
            string refreshToken = _jwtService.GenerateRefreshToken();

            await AddRefreshTokenToDatabase(user.Id, refreshToken, userIp);
            return new UserAndTokenResponseDTO
            {
                Id = user.Id,
                PublicId = user.PublicId,
                Username = user.Username,
                Email = user.Email,
                AccessLevel = user.AccessLevel,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                Birthdate = user.Birthdate,
                ExpiresIn = _jwtService.GetAccessTokenExpirationTime()
            };

        }
        public async Task<UserAndTokenResponseDTO?> RefreshTokenAsync(RefreshTokenRequest request)
        {
            var refreshToken = await _context.RefreshTokens.Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Token == request.RefreshToken && !t.IsRevoked);
            if(refreshToken == null) return null;
            var newAccessToken = _jwtService.GenerateAccessToken(refreshToken.Users);
            var newRefreshToken = _jwtService.GenerateRefreshToken();

            refreshToken.IsRevoked = true;
            RefreshToken newRefreshTokenEntity = new RefreshToken
            {
                Token = newRefreshToken,
                UserId = refreshToken.UserId,
                ExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays),
                IpAddress = GetUserIP() ?? ""
            };
            _context.RefreshTokens.Add(newRefreshTokenEntity);
            await _context.SaveChangesAsync();
            await RemoveExpiredRefreshTokenAsync(refreshToken.UserId);

            return new UserAndTokenResponseDTO
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                ExpiresIn = _jwtService.GetAccessTokenExpirationTime(),
                Username = refreshToken.Users.Username,
                Id = refreshToken.UserId,
                AccessLevel = refreshToken.Users.AccessLevel
            };
        }

        public async Task<bool> RevokeRefreshTokenAsync(string refreshToken)
        {
            var refreshTokenE = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.Token == refreshToken); // talvez adicionar && t.ip == ipAddress

            if (refreshTokenE == null || refreshTokenE.IsRevoked) return false;

            refreshTokenE.IsRevoked = true;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> RevokeAllUserTokenAsync(int userId)
        {
            var refreshTokens = await _context.RefreshTokens.Where(t => t.UserId == userId).ToListAsync();
            foreach (var token in refreshTokens)
            {
                token.IsRevoked = true;
            }
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string?> GetUnrevokeRefreshToken(string ipDispositivo, int id)
        {
            var reftoken = await _context.RefreshTokens.FirstOrDefaultAsync(x => x.IpAddress == ipDispositivo && x.UserId == id && x.IsRevoked == false);
            if (reftoken == null) return null;

            return reftoken.Token.ToString();
        }

        private async Task AddRefreshTokenToDatabase(int userId, string refreshToken, string? userIp)
        {
            RefreshToken refreshTokenEntity = new RefreshToken
            {
                Token = refreshToken,
                UserId = userId,
                ExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays),
                IpAddress = userIp ?? ""
            };
            _context.RefreshTokens.Add(refreshTokenEntity);
            //await _context.SaveChangesAsync();
            // deletar os refresh tokens expirados/revogados
             await RemoveExpiredRefreshTokenAsync(userId);
        }
        private async Task RemoveExpiredRefreshTokenAsync(int userId)
        {
            var expiredTokens = await _context.RefreshTokens
                .Where(t => t.UserId == userId && (t.IsRevoked || t.ExpiresAt <= DateTime.UtcNow)).ToListAsync();
            if(expiredTokens.Any())
            {
                _context.RefreshTokens.RemoveRange(expiredTokens);
            }
            await _context.SaveChangesAsync();
        }

        private string? GetUserIP()
        {
            var context = _contextAccessor.HttpContext;
            var ip = context?.Request.Headers["X-Forwarded-For"].FirstOrDefault();
            if(!string.IsNullOrEmpty(ip)) return ip;
            return context?.Connection.RemoteIpAddress?.ToString();
        }
    }
}
