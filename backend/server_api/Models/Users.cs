namespace server_api.Models
{
    public class Users
    {
        public int Id { get; set; }
        public Guid PublicId { get; set; } // = Guid.NewGuid(); no caso vou mexer no Configuration banco
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Email {  get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string AccessLevel { get; set; } = "Normal";
        public DateOnly Birthdate {  get; set; }

        public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
        public virtual UserGameStats? UserGameStats { get; set; }
        public virtual ICollection<UserAchievements> UserAchievements { get; set; } = new List<UserAchievements>();
        public virtual ICollection<UsersGames> UsersGames { get; set; } = new List<UsersGames>();
        public virtual ICollection<UserLesson> UsersLessons { get; set; } = new List<UserLesson>();
    }
}
