using System.Security.Claims;

namespace server_api.Commons
{
    public class UserJWTGet
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserJWTGet(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }
        private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

        public int GetUserIdFromJWT()
        {
            var userIdClaim = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(userIdClaim, out int userId) ? userId : throw new ArgumentException("Não foi possível encontrar este usuário");
        }
    }
}
