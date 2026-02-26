using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_api.Commons;
using server_api.DTOs.UserDTOs;
using server_api.Helpers;
using server_api.Services.Authentication;
using System.Security.Claims;

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
                var response = await _authService.SignUpUser(request);
                return Ok(response);
            }catch (InvalidPasswordException ex)
            {
                return BadRequest(ex.Validate);
            }
        }
        [HttpPost("Login")]
        public async Task<ActionResult<UserAndTokenResponseDTO?>> Login(UserLoginRequest request)
        {
            try
            {
                var response = await _authService.LoginAsync(request);
                if (response == null) return Unauthorized("Erro no Login");
                CookieHelper.SetJwtCookie(Response.Cookies, response.AccessToken);
                CookieHelper.SetRefreshTokenCookie(Response.Cookies, response.RefreshToken);
                return Ok(response);

            }
            catch
            {
                return StatusCode(500, new {message = "Erro interno do servidor"});
            }
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest? request)
        {
            try
            {
                var refreshFromCookie = Request.Cookies["refreshToken"];
                var providedToken = !string.IsNullOrWhiteSpace(refreshFromCookie) ? refreshFromCookie : request?.RefreshToken;
                if (string.IsNullOrWhiteSpace(providedToken)) return Unauthorized("Refresh token não fornecido");

                var response = await _authService.RefreshTokenAsync(new RefreshTokenRequest { RefreshToken = providedToken });
                if (response == null)
                {
                    CookieHelper.ClearAuthCookies(Response.Cookies);
                    return Unauthorized("Refresh token inválido ou expirado");
                }
                CookieHelper.ClearAuthCookies(Response.Cookies);
                CookieHelper.SetJwtCookie(Response.Cookies, response.AccessToken);
                CookieHelper.SetRefreshTokenCookie(Response.Cookies, response.RefreshToken);
                return Ok(response);
            }
            catch
            {
                return StatusCode(500, new { message = "Erro interno do servidor" });
            }
        }

        [HttpDelete("LogOut"), Authorize]
        public async Task<IActionResult> Logout(RefreshTokenRequest? request)
        {
            var refreshFromCookie = Request.Cookies["refreshToken"];

            var providedToken = !string.IsNullOrWhiteSpace(refreshFromCookie) ? refreshFromCookie : request?.RefreshToken;
            if (string.IsNullOrWhiteSpace(providedToken)) return BadRequest("Refresh token encontrado");

            var response = await _authService.RevokeRefreshTokenAsync(providedToken);
            if (response)
            {
                CookieHelper.ClearAuthCookies(Response.Cookies);
                return NoContent();
            }
            return BadRequest("Erro ao sair da conta");
        }

        [HttpPost("Revoke"), Authorize]
        public async Task<IActionResult> RevokeToken(RefreshTokenRequest request)
        {
            var response = await _authService.RevokeRefreshTokenAsync(request.RefreshToken);
            if (!response) return NotFound("Token não encontrado ou ja revogado");

            return NoContent();
        }

        [HttpPost("Revoke/All"), Authorize]
        public async Task<IActionResult> RevokeAllToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdClaim, out var userId)) return Unauthorized("Token inválido");
            await _authService.RevokeAllUserTokenAsync(userId);
            return NoContent();
        }

        [HttpGet("me"), Authorize]
        public IActionResult GetCurrentUser()
        {
            try
            {
                UserResponseDTO user = new UserResponseDTO
                {
                    Username = User.FindFirst(ClaimTypes.Name)?.Value ?? "errado",
                    AccessLevel = User.FindFirst(ClaimTypes.Role)?.Value ?? "errou",
                    Email = User.FindFirst(ClaimTypes.Email)?.Value ?? "email erro",
                    Id = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0")
                };

                return Ok(user);
            }
            catch
            {
                return Unauthorized("Deu errado");
            }
        }

    }
}
