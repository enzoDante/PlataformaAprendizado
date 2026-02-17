namespace server_api.Models
{
    public class UserGameStats
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual Users Users { get; set; } = null!;

        public int Lives { get; set; }
        public int ExperiencePoints { get; set; }
        public int Level { get; set; }
        public int Coins { get; set; }
        public int StreakDays { get; set; }
        public DateOnly LastActivityDate { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
