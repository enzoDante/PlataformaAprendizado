using server_api.Commons;
using server_api.Context;
using server_api.DTOs.UserDTOs;
using server_api.Models;

namespace server_api.Services.Authentication
{
    public class AuthService
    {
        private readonly ContextDB _context;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly int _refreshTokenExpirationDays;

        public AuthService(ContextDB context, JwtService jwtService, IConfiguration configuration)
        {
            _context = context;
            _jwtService = jwtService;
            _configuration = configuration;
            _refreshTokenExpirationDays = int.Parse(_configuration["JwtSettings:RefreshTokenExpirationInDays"] ?? "7");
        }

        public async Task<UserResponseDTO?> SignUpUser(UserSignUpRequest request, bool isMobile = false)
        {
            // validação de dados e senha
            
            UserDataValidator.ValidatePassword(request.Password);

            Users user = new Users
            {
                Username = request.Username,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Birthdate = request.BirthDate
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return new UserResponseDTO
            {
                Id = user.Id,
                PublicId = user.PublicId,
                Username = user.Username,
                Email = user.Email,
                Birthdate = user.Birthdate
            };
        }

        
    }
}
