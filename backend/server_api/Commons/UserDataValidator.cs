using System.Text.RegularExpressions;

namespace server_api.Commons
{
    public class UserDataValidator
    {
        public static void ValidatePassword(string password)
        {
            PasswordDTO userPassValidate =  new PasswordDTO
            {
                HasMaxLength = password.Length < 72,
                HasMinLength = password.Length >= 5,
                hasNumber = Regex.IsMatch(password, @"\d"),
                hasSpecialChar = Regex.IsMatch(password, @"[!@#$%^&*(),.?""':{}|<>\-_=+\[\]\\\/]"),
                hasToUpper = Regex.IsMatch(password, @"[A-Z]"),
                hasToLower = Regex.IsMatch(password, @"[a-z]")
            };
            if(!userPassValidate.Validate) throw new InvalidPasswordException(userPassValidate);
        }
        public static void ValidateEmail(string email)
        {
            if (!Regex.IsMatch(email, @"[\w\-_\+]+@[\w]+.[\w]+")) 
                throw new ArgumentException("Email inválido");
        }
    }
    public class PasswordDTO
    {
        public bool HasMinLength { get; set; }
        public bool HasMaxLength { get; set; }
        public bool hasNumber { get; set; }
        public bool hasSpecialChar { get; set; }
        public bool hasToUpper { get; set; }
        public bool hasToLower { get; set; }
        public bool Validate => hasNumber && hasSpecialChar && hasToUpper && hasToLower && HasMinLength && HasMaxLength;
    }
    public class InvalidPasswordException : Exception
    {
        public PasswordDTO Validate {  get; }
        public InvalidPasswordException(PasswordDTO validate): base("A Senha não atende aos requisitos mínimos.") { 
            Validate = validate;
        }
    }
}
