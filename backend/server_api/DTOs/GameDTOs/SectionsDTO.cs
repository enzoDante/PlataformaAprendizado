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
        public int Priority { get; set; } = 1;
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
        public int Priority { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
    public class UpdateSectionsRequest
    {
        public string? SectionTittle { get; set; }
        public string? Description { get; set; }
        public string? MediaUrl { get; set; }
        public float? MediaDuration { get; set; }
        public string? ImageUrl { get; set; }
        public int? Priority { get; set; }
    }
}
