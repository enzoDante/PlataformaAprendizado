using AutoMapper;
using server_api.Commons;
using server_api.Context;
using server_api.DTOs.UserDTOs;

namespace server_api.Services.UserService
{
    public class ProfileService
    {
        private readonly ContextDB _context;
        private readonly IMapper _mapper;
        private readonly UserJWTGet _userJWTGet;
        public ProfileService(ContextDB context, IMapper mapper, UserJWTGet userJWTGet)
        {
            _context = context;
            _mapper = mapper;
            _userJWTGet = userJWTGet;
        }

        public async Task<UserResponseDTO?> GetUserProfile()
        {
            int userId = _userJWTGet.GetUserIdFromJWT();
            return _mapper.Map<UserResponseDTO>(await _context.Users.FindAsync(userId));
        }

        public async Task<UserResponseDTO?> UpdateUserProfile(UserUpdateRequest request)
        {
            int userId = _userJWTGet.GetUserIdFromJWT();
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;
            // Atualiza os campos do usuário com os dados do request
            user.Username = request.Username ?? user.Username;
            user.Email = request.Email ?? user.Email;
            user.Birthdate = request.Birthdate ?? user.Birthdate;

            await _context.SaveChangesAsync();
            return _mapper.Map<UserResponseDTO>(user);
        }

        public async Task<bool> UpdateUserPassword(string newPassword)
        {
            int userId = _userJWTGet.GetUserIdFromJWT();
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;
            user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
            await _context.SaveChangesAsync();
            return true;
        }

        
    }
}