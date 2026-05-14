namespace server_api.Models
{
    public class Sections
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public virtual Game Game { get; set; } = null!;
        public string SectionTittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string MediaUrl {  get; set; } = string.Empty;
        public float MediaDuration { get; set; }
        public string ImageUrl {  get; set; } = string.Empty;
        public int Priority { get; set; } = 1;
        public DateTime CreatedAt {  get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public virtual ICollection<ClassLevel> ClassLevels { get; set; } = new List<ClassLevel>();
    }
}
