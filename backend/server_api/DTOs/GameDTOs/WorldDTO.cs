namespace server_api.DTOs.GameDTOs
{
    public class WorldDTO
    {
        public GameDTOs.GameResponse Game { get; set; } = null!;
        public SectionsResponse Section { get; set; } = null!;
    }
}
