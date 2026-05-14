namespace server_api.Models
{
    public class ClassLevel
    {
        public int Id { get; set; }
        public int SectionId { get; set; }
        public virtual Sections Sections { get; set; } = null!;

        public string ClassTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl {  get; set; } = string.Empty;
        public float MediaDuration {  get; set; }
        public string ImageUrl {  get; set; } = string.Empty;
        public int Experience { get; set; }
        public bool IsLesson { get; set; } // caso seja true --> é uma atividade para responder
        public int Priority { get; set; } = 1;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<UserLesson> UserLessons { get; set; } = new List<UserLesson>();
    }
}
