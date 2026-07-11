using AutoMapper;
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

        public async Task<PageResponse<GameResponse>> GetGamesPage(
            PageRequest request,
            string? searchName = null,
            string? searchDifficulty = null,
            bool? searchCertification = null,
            bool? myGames = null,
            DateTime? searchCreatedAt = null
            )
        {
            IQueryable<Game> query = _context.Games.AsNoTracking();
            if (!string.IsNullOrEmpty(searchName))
            {
                query = query.Where(g => g.Tittle.Contains(searchName));
            }
            if (!string.IsNullOrEmpty(searchDifficulty))
            {
                query = query.Where(g => g.Dificult.Contains(searchDifficulty));
            }
            if (searchCertification.HasValue)
            {
                query = query.Where(g => g.Certification == searchCertification.Value);
            }
            if (myGames.HasValue)
            {
                query = myGames.Value
                    ? query.Where(g => g.UsersGames.Any(ug => ug.UserId == _userId))
                    : query.Where(g => !g.UsersGames.Any(ug => ug.UserId == _userId));
            }
            if (searchCreatedAt.HasValue)
            {
                DateTime date = searchCreatedAt.Value;
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
        // criar os métodos que retornam qualquer informação do jogo, como as seções, as classes, etc. para o usuário poder acessar
        public async Task AddDailyPointsAndUpdateStreak(int points)
        {
            var stats = await _context.UserGameStats.FirstOrDefaultAsync(s => s.UserId == _userId);
            if (stats == null) throw new ArgumentException("Estatísticas do usuário não encontradas");

            var hoje = DateOnly.FromDateTime(DateTime.UtcNow);

            // Se a última atividade não foi hoje, é um novo dia: precisamos decidir o que fazer com o streak
            if (stats.LastActivityDate != hoje)
            {
                int diasSemAtividade = hoje.DayNumber - stats.LastActivityDate.DayNumber;

                // Perde a ofensiva se pulou mais de 1 dia OU não bateu a meta no último dia registrado
                if (diasSemAtividade > 1 || !stats.DailyGoalReachedToday)
                {
                    stats.StreakDays = 0;
                }

                stats.DailyPointsEarned = 0;
                stats.DailyGoalReachedToday = false;
                stats.LastActivityDate = hoje;
            }

            stats.DailyPointsEarned += points;
            stats.ExperiencePoints += points;

            if (!stats.DailyGoalReachedToday && stats.DailyPointsEarned >= stats.DailyGoal)
            {
                stats.DailyGoalReachedToday = true;
                stats.StreakDays += 1;
            }

            stats.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }
    }
}
