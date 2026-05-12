using server_api.Commons;
using server_api.Context;

namespace server_api.Services.GameService
{
    public class GameAdminService
    {
        private readonly ContextDB _context;
        private readonly UserJWTGet _userJWTGet;
        public GameAdminService(ContextDB context, UserJWTGet userJWTGet)
        {
            _context = context;
            _userJWTGet = userJWTGet;
        }


    }
}
