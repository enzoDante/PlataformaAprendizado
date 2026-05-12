namespace server_api.Models
{
    public class UserLesson
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual Users User { get; set; } = null!;
        public int ClassId { get; set; }
        public virtual ClassLevel ClassLevel { get; set; } = null!;

        public string UserResolution { get; set; } = string.Empty;
        public int experience { get; set; }
        public bool AnwserCorrect { get; set; }
        public bool Complete {  get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
