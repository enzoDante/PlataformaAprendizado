using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server_api.Commons;
using server_api.Context;
using server_api.DTOs.GameDTOs;
using server_api.Models;

namespace server_api.Services.GameService
{
    public class GameAdminService
    {
        private readonly ContextDB _context;
        private readonly UserJWTGet _userJWTGet;
        private readonly IMapper _mapper;
        private readonly int _userId;
        public GameAdminService(ContextDB context, UserJWTGet userJWTGet, IMapper mapper)
        {
            _context = context;
            _userJWTGet = userJWTGet;
            _mapper = mapper;
            _userId = _userJWTGet.GetUserIdFromJWT();
        }
        // ============================ GAME ============================
        public async Task<GameResponse> CreateGame(CreateGameRequest request)
        {
            //int id = _userJWTGet.GetUserIdFromJWT();
            Game jogo = _mapper.Map<Game>(request);

            UsersGames usersGames = new UsersGames
            {
                UserId = _userId,
                GameId = jogo.Id,
                Game = jogo, // Resolve problema de ID, pois o jogo ainda não tem um ID atribuído
                Creator = true
            };

            _context.Games.Add(jogo);
            _context.UsersGames.Add(usersGames);

            await _context.SaveChangesAsync();

            return _mapper.Map<GameResponse>(jogo);

        }

        public async Task<bool> DeleteGame(int id)
        {
            //int userId = _userJWTGet.GetUserIdFromJWT();
            var game = await _context.Games.Include(g => g.UsersGames)
                                            .FirstOrDefaultAsync(g => g.Id == id && g.UsersGames.Any(ug => ug.UserId == _userId && ug.Creator));
            if (game == null)
            {
                throw new ArgumentException("Jogo não encontrado");
            }
            _context.Games.Remove(game);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<GameResponse> UpdateGame(int id, UpdateGameRequest request)
        {
            Game? game = await _context.Games.FirstOrDefaultAsync(g => g.Id == id);
            if (game == null) throw new ArgumentException("Não foi possível encontrar esse Jogo");

            game.Tittle = request.Tittle ?? game.Tittle;
            game.Description = request.Description ?? game.Description;
            game.Certification = request.Certification ?? game.Certification;
            game.Dificult = request.Dificult ?? game.Dificult;
            game.UrlImg = request.UrlImg ?? game.UrlImg;

            await _context.SaveChangesAsync();

            return _mapper.Map<GameResponse>(game);
        }

        // ============================ SECTIONS ============================

        public async Task<SectionsResponse> CreateSection(CreateSectionsRequest request)
        {
            Sections section = _mapper.Map<Sections>(request);
            _context.Sections.Add(section);
            await _context.SaveChangesAsync();

            return _mapper.Map<SectionsResponse>(section);
        }

        public async Task<bool> DeleteSection(int id)
        {
            var section = await _context.Sections.FindAsync(id);
            if (section == null)
            {
                throw new ArgumentException("Seção não encontrada");
            }
            _context.Sections.Remove(section);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<SectionsResponse> UpdateSection(int id, UpdateSectionsRequest request)
        {
            Sections? section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == id);
            if (section == null) throw new ArgumentException("Não foi possível encontrar essa Seção");

            section.SectionTittle = request.SectionTittle ?? section.SectionTittle;
            section.Description = request.Description ?? section.Description;
            section.MediaUrl = request.MediaUrl ?? section.MediaUrl;
            section.MediaDuration = request.MediaDuration ?? section.MediaDuration;
            section.ImageUrl = request.ImageUrl ?? section.ImageUrl;

            section.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return _mapper.Map<SectionsResponse>(section);
        }

        // ============================ CLASS_LEVEL ============================

        public async Task<ClassResponse> CreateClassLevel(CreateClassRequest request)
        {
            ClassLevel classL = _mapper.Map<ClassLevel>(request);
            _context.ClassLevels.Add(classL);

            // quando criar essa aula, preciso verificar se é um desafio, caso seja um desafio, o admin precisa informar a resposta.
            if (classL.IsLesson)
            {
                UserLesson userLesson = new UserLesson
                {
                    UserId = _userId,
                    ClassId = classL.Id,
                    ClassLevel = classL,
                    UserResolution = request.Answer ?? "",
                };
                _context.UsersLessons.Add(userLesson);
            }

            await _context.SaveChangesAsync();

            return _mapper.Map<ClassResponse>(classL);
        }

        public async Task<bool> DeleteClassLevel (int id)
        {
            var classL = await _context.ClassLevels.FindAsync(id);
            if (classL == null)
            {
                throw new ArgumentException("Classe não encontrada");
            }
            _context.ClassLevels.Remove(classL);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<ClassResponse> UpdateClassLevel(int id, UpdateClassRequest request)
        {
            ClassLevel? level = await _context.ClassLevels.FirstOrDefaultAsync(c => c.Id == id);
            if (level == null) throw new ArgumentException("Não foi possível encontrar essa Classe");

            level.ClassTittle = request.ClassTittle ?? level.ClassTittle;
            level.Description = request.Description ?? level.Description;
            level.MediaUrl = request.MediaUrl ?? level.MediaUrl;
            level.MediaDuration = request.MediaDuration ?? level.MediaDuration;
            level.ImageUrl = request.ImageUrl ?? level.ImageUrl;
            level.Experience = request.Experience ?? level.Experience;
            level.IsLesson = request.IsLesson ?? level.IsLesson;

            if (level.IsLesson) { 
                var userLesson = await _context.UsersLessons.FirstOrDefaultAsync(ul => ul.ClassId == level.Id && ul.UserId == _userId);
                if (userLesson != null)
                {
                    userLesson.UserResolution = request.Answer ?? userLesson.UserResolution;
                    userLesson.UpdatedAt = DateTime.UtcNow;
                }
            }

            level.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return _mapper.Map<ClassResponse>(level);
        }

    }
}
