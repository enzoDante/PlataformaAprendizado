using AutoMapper;
using server_api.DTOs.UserDTOs;
using server_api.Models;
namespace server_api.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Users, UserResponseDTO>();
            CreateMap<Users, UserAndTokenResponseDTO>()
                .IncludeBase<Users, UserResponseDTO>();

            CreateMap<UserSignUpRequest, Users>();
        }
    }
}
