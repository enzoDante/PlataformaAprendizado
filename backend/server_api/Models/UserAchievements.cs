namespace server_api.Models
{
    public class UserAchievements
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual Users Users { get; set; } = null!;
        public int AchievementId { get; set; }
        public virtual Achievements Achievements { get; set; } = null!;

        public DateTime UnlockedAt { get; set; }
        
    }
}
