using Microsoft.AspNetCore.Mvc;
using server_api.Commons;
using server_api.DTOs.UserDTOs;
using server_api.Helpers;
using server_api.Services.Authentication;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly AuthService _authService;
        
        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult<UserResponseDTO?>> SignUp(UserSignUpRequest request)
        {
            try
            {
                string userAgent = DevicesHelper.UserDevice(Request);
                var response = await _authService.SignUpUser(request, userAgent == "Mobile");
                return Ok(response);
            }catch (InvalidPasswordException ex)
            {
                return BadRequest(ex.Validate);
            }
        }

    }
}
