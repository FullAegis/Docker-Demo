using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Candy.BLL.Models.Orders;
using Candy.DAL.Models;

namespace Candy.BLL.Models {
  public class User {
    [Key] public int Id { get; set; }
  
    [MaxLength(128)]
    public string LastName { get; set; }
    [MaxLength(128)]
    public string FirstName { get; set; }
  
    [Required]
    [EmailAddress]
    public required string Email { get; set; }
  
    [Required]
    [PasswordPropertyText]
    public required string Password { get; set; }
    
    public UserRole Role { get; set; }
    public ICollection<Order> Orders { get; set; }
  };
}
