using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_api.Commons;
using server_api.Commons.Pagination;
using server_api.Context;
using server_api.DTOs.GameDTOs;
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

        public async Task<PageResponse<GameResponse>> GetGamesPage([FromQuery] GameFiltersRequest request)
        {
            IQueryable<Game> query = _context.Games.AsNoTracking();
            if (!string.IsNullOrEmpty(request.SearchName))
            {
                query = query.Where(g => g.Tittle.Contains(request.SearchName));
            }
            if (!string.IsNullOrEmpty(request.SearchDifficulty))
            {
                query = query.Where(g => g.Dificult.Contains(request.SearchDifficulty));
            }
            if (request.SearchCertification.HasValue)
            {
                query = query.Where(g => g.Certification == request.SearchCertification.Value);
            }
            if (request.MyGames.HasValue)
            {
                query = request.MyGames.Value
                    ? query.Where(g => g.UsersGames.Any(ug => ug.UserId == _userId))
                    : query.Where(g => !g.UsersGames.Any(ug => ug.UserId == _userId));
            }
            if (request.SearchCreatedAt.HasValue)
            {
                DateTime date = request.SearchCreatedAt.Value;
                query = query.Where(g => g.CreatedAt >= date && g.CreatedAt < date.AddDays(1));
            }

            PageResponse<Game> pagedGames = await query.ToPagedListAsync(request);

            var gameResponse = pagedGames.Items.Select(g => _mapper.Map<GameResponse>(g)); //.ToList()
            return new PageResponse<GameResponse>(gameResponse, pagedGames.Metadata);
        }

        public async Task<WorldDTO> GetGameAndSections(int gameId)
        {
            // game get e junto com todas as sections do jogo
            Game? gameSection = await _context.Games.Include(g => g.Sections)
                .FirstOrDefaultAsync(g => g.Id == gameId);

            if (gameSection == null) throw new ArgumentException("Jogo não encontrado");

            return _mapper.Map<WorldDTO>(gameSection); // retorna o jogo com as seções mapeadas para o DTO WorldDTO


        }

        public async Task<IEnumerable<ClassResponse>> GetSectionClasses(int sectionId)
        {
            List<ClassLevel> classes = await _context.ClassLevels.Where(g => g.SectionId == sectionId).ToListAsync();

            return classes.Select(c => _mapper.Map<ClassResponse>(c)); // retorna as classes mapeadas para o DTO ClassResponse
        }

        // talvez deva mudar esse método
        // talvez faça mais sentido que esse método seja chamado quando o usuário concluir a aula
        public async Task<bool> ClassCompleted(int classId) //caso a classe já tenha sido completada, retorna true, caso contrário, cria um registro de UserLesson para o usuário e retorna false
        {
            ClassLevel? classLevel = await _context.ClassLevels.Include(g => g.UserLessons).FirstOrDefaultAsync(g => g.Id == classId);
            if(classLevel == null) throw new ArgumentException("Classe não encontrada");
            UserLesson? userLesson = classLevel.UserLessons.FirstOrDefault(g => g.UserId == _userId);
            if (userLesson != null)
            {
                userLesson.Complete = true;
                await _context.SaveChangesAsync();
                return true; // se o usuário já tiver completado a classe, retorna true
            }
            userLesson = new UserLesson
            {
                UserId = _userId,
                ClassId = classId,
                Complete = false
            };
            _context.UsersLessons.Add(userLesson);
            await _context.SaveChangesAsync();
            return false;
        }

        public async Task<bool> AnwserClass(int classId, int gameId, string anwser)
        {
            ClassLevel? classLevel = await _context.ClassLevels.FirstOrDefaultAsync(g => g.Id == classId);
            if (classLevel == null || !classLevel.IsLesson) throw new ArgumentException("");

            //int creatorId = await _context.UsersGames.Where(c => c.GameId == gameId && c.Creator).Select(c => c.UserId).FirstOrDefaultAsync();
            //string correctAnwser = await _context.UsersLessons.Where(c => c.UserId == creatorId && c.ClassId == classId).Select(c => c.UserResolution).FirstOrDefaultAsync();
            string? correctAnwser = await _context.UsersLessons
                .Where(ul => ul.ClassId == classId && _context.UsersGames.Any(ug => ug.GameId == gameId && ug.Creator && ug.UserId == ul.UserId))
                .Select(ul => ul.UserResolution).FirstOrDefaultAsync();

            UserLesson? userLesson = await _context.UsersLessons.FirstOrDefaultAsync(g => g.ClassId == classId && g.UserId == _userId);
            bool isCorrect = correctAnwser == anwser;

            if(userLesson == null)
            {
                userLesson = new UserLesson
                {
                    UserId = _userId,
                    ClassId = classId
                };
                _context.Add(userLesson);
            }else userLesson.UpdatedAt = DateTime.UtcNow;
            userLesson.UserResolution = anwser;
            userLesson.Complete = true;
            userLesson.AnwserCorrect = isCorrect;
            await _context.SaveChangesAsync();

            return isCorrect;
        }
        // criar os métodos que retornam qualquer informação do jogo, como as seções, as classes, etc. para o usuário poder acessar


    }
}
