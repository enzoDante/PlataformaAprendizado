namespace server_api.Models
{
    public class Game
    {
        public int Id { get; set; }
        public string Tittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Certification { get; set; } = false;
        public string Dificult {  get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string UrlImg { get; set; } = string.Empty;

        public virtual ICollection<UsersGames> UsersGames { get; set; } = new List<UsersGames>();
        public virtual ICollection<Sections> Sections { get; set; } = new List<Sections>();

    }
}
