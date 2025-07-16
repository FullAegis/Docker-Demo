using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Candy.DAL.Models.Orders;

namespace Candy.DAL.Models.Products {
  public class Candy {
    [Key] public int Id { get; set; }

    [Required] public string Name { get; set; }
    public string? Description { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal PriceBeforeTax { get; set; }

    [Required]
    public uint StockQuantity { get; set; } = 0u;

#region Foreign Key Properties
    [Required] public int BrandId { get; set; }
    [Required] public int CategoryId { get; set; }
#endregion
#region Navigation Properties
    [ForeignKey("BrandId")] 
    public Brand Brand { get; set; } 
    [ForeignKey("CategoryId")] 
    public Category Category { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
#endregion
  };
}
