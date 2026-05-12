namespace server_api.DTOs.GameDTOs
{
    public class CreateGameRequest
    {
        public string Tittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Certification { get; set; } = false;
        public string Dificult { get; set; } = string.Empty;
        public string UrlImg { get; set; } = string.Empty;
    }

    public class GameResponse
    {
        public int Id { get; set; }
        public string Tittle { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool Certification { get; set; } = false;
        public string Dificult { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public string UrlImg { get; set; } = string.Empty;
    }
}
