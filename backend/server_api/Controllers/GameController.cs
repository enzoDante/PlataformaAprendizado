using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_api.Services.GameService;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GameController : Controller
    {
        private readonly GameUserService _gameUserService;

        public GameController(GameUserService gameUserService)
        {
            _gameUserService = gameUserService;
        }

        [HttpPost("ClassCompleted/{classId}")]
        public async Task<IActionResult> ClassCompleted(int classId)
        {
            var result = await _gameUserService.ClassCompleted(classId);
            return Ok(result);
        }
    }
}
