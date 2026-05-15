using server_api.Commons.Pagination;

namespace server_api.DTOs.GameDTOs
{
    public class WorldDTO : GameResponse
    {
        public List<SectionsResponse> Section { get; set; } = new();
    }

    public class SectionDetailResponse
    {
        public int Id { get; set; }
        public List<ClassResponse> ClassResponse { get; set; } = new();
    }

    public class GameFiltersRequest : PageRequest
    {
        public string? SearchName { get; set; }
        public string? SearchDifficulty { get; set; }
        public bool? SearchCertification { get; set; }
        public bool? MyGames { get; set; }
        public DateTime? SearchCreatedAt { get; set; }
    }
}
