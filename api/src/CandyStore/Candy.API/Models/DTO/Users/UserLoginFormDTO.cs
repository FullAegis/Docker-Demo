using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Candy.API.Models.DTO.Users;
public class UserLoginFormDTO {
  [Required]
  [EmailAddress] 
  public required string Email { get; set; }

  [Required]
  [PasswordPropertyText]
  public required string Password { get; set; }
};
