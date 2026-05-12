using server_api.Models;

namespace server_api.DTOs.GameDTOs
{
    public class CreateSectionsRequest
    {
        public int GameId { get; set; }
        public string SectionTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public float MediaDuration { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
    }

    public class SectionsResponse
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public string SectionTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public float MediaDuration { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
