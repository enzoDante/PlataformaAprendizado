namespace server_api.Models
{
    public class UsersGames
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public virtual Users Users { get; set; } = null!;
        public int GameId { get; set; }
        public virtual Game Game { get; set; } = null!;

        public bool Creator { get; set; } = false;
        public bool Complete { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
