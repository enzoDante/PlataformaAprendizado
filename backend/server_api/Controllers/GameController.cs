using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_api.Commons.Pagination;
using server_api.DTOs.GameDTOs;
using server_api.Services.GameService;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly GameUserService _gameUserService;
        public GameController(GameUserService gameUserService)
        {
            _gameUserService = gameUserService;
        }

        [HttpPost("{gameId}/JoinGame"), Authorize]
        public async Task<IActionResult> JoinGame(int gameId)
        {
            await _gameUserService.JoinGame(gameId);
            return Ok($"Usuário registrado com sucesso no jogo: {gameId}");
        }

        [HttpGet("Games"), Authorize]
        public async Task<ActionResult<PageResponse<GameResponse>>> GetGamesPage(GameFiltersRequest request)
        {
            PageResponse<GameResponse> response = await _gameUserService.GetGamesPage(request);
            return Ok(response);
        }

        [HttpGet("{gameId}/Sections", Name = "GetGameAndSectionsRoute"), Authorize]
        public async Task<ActionResult<WorldDTO>> GetGameAndSections(int gameId)
        {
            return Ok(await _gameUserService.GetGameAndSections(gameId));
        }

        [HttpGet("Section/{id}/Classes", Name = "GetSectionClassesRoute"), Authorize]
        public async Task<ActionResult<IEnumerable<ClassResponse>>> GetSectionClasses(int id)
        {
            return Ok(await _gameUserService.GetSectionClasses(id));
        }

        [HttpPost("Class/{id}/Completed"), Authorize]
        public async Task<IActionResult> ClassCompleted(int id)
        {
            bool completed = await _gameUserService.ClassCompleted(id);
            return NoContent();
        }

        [HttpPost("{gameId}/Class/{classId}/Anwser"), Authorize]
        public async Task<IActionResult> AnwserClass(int gameId, int classId, [FromQuery] string anwser)
        {
            bool response = await _gameUserService.AnwserClass(classId, gameId, anwser);
            return Ok(response);
        }
    }
}
