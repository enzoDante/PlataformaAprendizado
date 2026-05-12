using server_api.Models;

namespace server_api.DTOs.GameDTOs
{
    public class CreateClassRequest
    {
        public int SectionId { get; set; }

        public string ClassTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public float MediaDuration { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int Experience { get; set; }
        public bool IsLesson { get; set; } // caso seja true --> é uma atividade para responder
    }

    public class ClassResponse
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public string ClassTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl { get; set; } = string.Empty;
        public float MediaDuration { get; set; }
        public string ImageUrl { get; set; } = string.Empty;
        public int Experience { get; set; }
        public bool IsLesson { get; set; } // caso seja true --> é uma atividade para responder
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
    public class UpdateClassRequest
    {
        public string? ClassTittle { get; set; }
        public string? Description { get; set; }
        public string? MediaUrl { get; set; }
        public float? MediaDuration { get; set; }
        public string? ImageUrl { get; set; }
        public int? Experience { get; set; }
        public bool? IsLesson { get; set; } // caso seja true --> é uma atividade para responder
    }
}
