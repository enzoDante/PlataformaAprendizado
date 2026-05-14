namespace server_api.DTOs.UserDTOs
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public Guid PublicId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateOnly Birthdate { get; set; }
        public string AccessLevel { get; set; } = string.Empty;
    }
    public class UserAndTokenResponseDTO : UserResponseDTO
    {
        public string TokenType { get; set; } = "Bearer";
        public int ExpiresIn { get; set; } // seconds
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken {  get; set; } = string.Empty;
    }
}
