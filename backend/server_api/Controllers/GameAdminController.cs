using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_api.DTOs.GameDTOs;
using server_api.Services.GameService;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameAdminController : Controller
    {
        private readonly GameAdminService _gameAdminService;
        public GameAdminController(GameAdminService gameAdminService)
        {
            _gameAdminService = gameAdminService;
        }

        [HttpPost("Game"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<GameResponse>> CreateGame(CreateGameRequest request)
        {
            GameResponse response = await _gameAdminService.CreateGame(request);
            return CreatedAtAction("GetGameAndSections", "Game", new {id = response.Id}, response);
            // no nameof colocar o método do controller que seria o Get do Game by id
            // caso esteja em outro controller, pode separar com aspas os nomes:
            // "GetGameAndSections" é o nome do método no outro Controller
            // "Game" é o nome do Controller: GameController
        }

        [HttpDelete("Game/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            await _gameAdminService.DeleteGame(id);
            return NoContent();
        }

        [HttpPut("Game/{id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<GameResponse>> UpdateGame(int id, UpdateGameRequest request)
        {
            return Ok(await _gameAdminService.UpdateGame(id, request));
        }

        // ============================ SECTIONS ============================

        [HttpPost("Section"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<SectionsResponse>> CreateSection(CreateSectionsRequest request)
        {
            SectionsResponse response = await _gameAdminService.CreateSection(request);
            return CreatedAtAction("GetSectionClasses", "Game", new { id = response.Id }, response);
        }

        [HttpDelete("Section/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSection(int id)
        {
            await _gameAdminService.DeleteSection(id);
            return NoContent();
        }
        [HttpPut("Section/{id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<SectionsResponse>> UpdateSection(int id, UpdateSectionsRequest request)
        {
            return Ok(await _gameAdminService.UpdateSection(id, request));
        }

        // ============================ CLASS_LEVEL ============================

        [HttpPost("Class"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<ClassResponse>> CreateClassLevel(CreateClassRequest request)
        {
            ClassResponse response = await _gameAdminService.CreateClassLevel(request);
            return CreatedAtAction("GetSectionClasses", "Game", new {id = response.Id}, response);
        }
        [HttpDelete("Class/{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteClassLevel(int id)
        {
            await _gameAdminService.DeleteClassLevel(id);
            return NoContent();
        }
        [HttpPut("Class/{id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<ClassResponse>> UpdateClassLevel(int id, UpdateClassRequest request)
        {
            return Ok(await _gameAdminService.UpdateClassLevel(id, request));
        }

    }
}
