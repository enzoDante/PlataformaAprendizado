namespace server_api.Models
{
    public class Achievements
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string IconUrl {  get; set; } = string.Empty;
        public int Points { get; set; }

        public virtual ICollection<UserAchievements> UserAchievements { get; set; } = new List<UserAchievements>();
    }
}
