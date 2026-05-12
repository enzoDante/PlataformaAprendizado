using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_api.Commons;
using server_api.Context;
using server_api.Models;

namespace server_api.Services.GameService
{
    public class GameUserService
    {
        private readonly ContextDB _context;
        private readonly UserJWTGet _userJWTGet;
        private readonly IMapper _mapper;
        private readonly int _userId;
        public GameUserService(ContextDB context, UserJWTGet userJWTGet, IMapper mapper)
        {
            _context = context;
            _userJWTGet = userJWTGet;
            _mapper = mapper;
            _userId = _userJWTGet.GetUserIdFromJWT();
        }

        public async Task<bool> JoinGame(int gameId)
        {
            Game? game = await _context.Games.Include(c => c.UsersGames).FirstOrDefaultAsync(c => c.Id == gameId);
            if (game == null) throw new ArgumentException("Jogo não encontrado");

            if (game.UsersGames.Any(c => c.UserId == _userId)) throw new ArgumentException("Usuário já está participando do jogo");

            UsersGames usersGames = new UsersGames
            {
                GameId = gameId,
                UserId = _userId
            };

            _context.UsersGames.Add(usersGames);
            await _context.SaveChangesAsync();
            return true;
        }

        // criar os métodos que retornam qualquer informação do jogo, como as seções, as classes, etc. para o usuário poder acessar


    }
}
