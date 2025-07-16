using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Candy.DAL.Models.Orders {
  public class Order {
    [Key] 
    public int Id { get; set; }
    
#region Foreign Key Properties
    [Required]
    public required int UserId { get; set; }
#endregion
    [ForeignKey("UserId")]
    public User User { get; set; }
    
    [Required]
    [Column(TypeName = "datetime2")]
    public required DateTime OrderDate { get; set; }
    
    [Required]
    [MaxLength(50)]
    public required string Status { get; set; } // e.g., "Pending", "Processed", "Cancelled"

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public required decimal TotalTaxAmount { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public required decimal TotalPriceWithTax { get; set; }

    public ICollection<OrderItem> OrderItems { get; set; }
  };
}
