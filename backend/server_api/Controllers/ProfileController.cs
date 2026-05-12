using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server_api.DTOs.UserDTOs;
using server_api.Services.UserService;

namespace server_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : Controller
    {
        private readonly ProfileService _profileService;
        public ProfileController(ProfileService profileService)
        {
            _profileService = profileService;
        }

        [HttpGet, Authorize]
        public async Task<ActionResult<UserResponseDTO?>> Get()
        {
            return await _profileService.GetUserProfile();
        }

        [HttpPut, Authorize]
        public async Task<ActionResult<UserResponseDTO?>> UpdateProfile(UserUpdateRequest request)
        {
            var updatedProfile = await _profileService.UpdateUserProfile(request);
            if (updatedProfile == null) return NotFound();
            return updatedProfile;
        }
        [HttpPut("password"), Authorize]
        public async Task<ActionResult> UpdatePassword(string newPassword)
        {
            bool success = await _profileService.UpdateUserPassword(newPassword);
            if (!success) return BadRequest("Não foi possível atualizar a senha. Verifique se o usuário existe e se você tem permissão para alterar esta senha.");
            return NoContent();
        }


    }
}
