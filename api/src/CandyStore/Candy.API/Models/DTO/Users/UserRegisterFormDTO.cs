using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Candy.API.Models.DTO.Users;
public class UserRegisterFormDTO {
  public string LastName { get; set; }
  public string FirstName { get; set; }

  [Required]
  [EmailAddress]
  public required string Email { get; set; }
  
  private string _password;
  [Required]
  [PasswordPropertyText]
  [StringLength(maximumLength: 72, MinimumLength = 8)]
  public required string Password { get; set; }
};
