namespace server_api.DTOs.UserDTOs
{
    public class UserUpdateRequest
    {
        public string? Username { get; set; }
        public string? Email { get; set; }
        public DateOnly? Birthdate { get; set; }
    }
}
