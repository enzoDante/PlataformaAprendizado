namespace server_api.DTOs.UserDTOs
{
    public class UserResponseDTO
    {
        public int Id { get; set; }
        public Guid PublicId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateOnly Birthdate { get; set; }
    }
    public class UserAndTokenResponseDTO : UserResponseDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken {  get; set; } = string.Empty;
    }
}
