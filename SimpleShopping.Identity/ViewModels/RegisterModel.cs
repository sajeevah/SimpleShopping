using System.ComponentModel.DataAnnotations;

namespace SimpleShopping.Identity.ViewModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
        
        //[Required(ErrorMessage = "User role is required")]
        //public UserRole? role { get; set; }
    }
}
