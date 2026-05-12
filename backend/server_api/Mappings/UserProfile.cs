using AutoMapper;
using server_api.DTOs.UserDTOs;
using server_api.Models;
namespace server_api.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Users, UserResponseDTO>(); // Mapeamento de Users para UserResponseDTO
            CreateMap<Users, UserAndTokenResponseDTO>() // Mapeamento de Users para UserAndTokenResponseDTO, incluindo as propriedades do UserResponseDTO
                .IncludeBase<Users, UserResponseDTO>();

            CreateMap<UserSignUpRequest, Users>(); // Mapeamento para criar um novo usuário a partir do DTO de cadastro
        }
    }
}
