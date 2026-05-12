using AutoMapper;
using server_api.DTOs.GameDTOs;
using server_api.Models;

namespace server_api.Mappings
{
    public class GameProfile : Profile
    {
        public GameProfile()
        {
            CreateMap<CreateGameRequest, Game>(); // Mapeamento de CreateGameRequest para Games
            CreateMap<Game, GameResponse>(); // Mapeamento de Games para GameResponse

            CreateMap<CreateSectionsRequest, Sections>(); // Mapeamento de CreateSectionsRequest para Sections
            CreateMap<Sections, SectionsResponse>(); // Mapeamento de Sections para SectionsResponse

            CreateMap<CreateClassRequest, ClassLevel>();
            CreateMap<ClassLevel, ClassResponse>();
        }
    }
}
