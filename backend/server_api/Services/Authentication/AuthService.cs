using server_api.Context;

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
        // fazer o sistema de login e autenticação
    }
}
