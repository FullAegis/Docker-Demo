using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Candy.DAL.Models.Orders;

namespace Candy.DAL.Models {
  public class User {
    [Key] public required int Id { get; set; }
    
    [MaxLength(128)]
    public string LastName { get; set; }
    [MaxLength(128)]
    public string FirstName { get; set; }
    
    [Required]
    [EmailAddress]
    [StringLength( maximumLength: 128
                 , MinimumLength = 8
                 , ErrorMessage = "Email address must be 8 to 128 characters long.")
    ]
    public required string Email { get; set; }
    
    [Required]
    [PasswordPropertyText]
    public required string Password { get; set; }
    
    [Required]
    [Column(name: "Role", TypeName = "smallint")]
    public required UserRole Role { get; set; } = UserRole.Customer;
    
    
    // [User] 1 —— Places ——> * [Order]
    public ICollection<Order> Orders { get; set; }
  };
}
