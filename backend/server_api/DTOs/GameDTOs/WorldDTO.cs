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
}
