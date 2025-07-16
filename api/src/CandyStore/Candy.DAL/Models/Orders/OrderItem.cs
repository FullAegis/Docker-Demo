using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Candy.DAL.Models.Orders {
  using Dal = Candy.DAL.Models.Products;
  
  public class OrderItem {
    [Key] public int Id { get; set; }

#region Foreign Key
    [Required] public int OrderId { get; set; }
    [Required] public int CandyId { get; set; }
#endregion
    [Required] public uint Quantity { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal UnitPrice { get; set; }

    [Required]
    [Column(TypeName = "decimal(5, 4)")] // Store the tax rate applied for historical accuracy
    public decimal TaxRate { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")] // (Quantity * UnitPrice * TaxRate)
    public decimal ItemTaxAmount { get; set; }

    [Required]
    [Column(TypeName = "decimal(18, 2)")] // (Quantity * UnitPrice * (1 + TaxRate))
    public decimal ItemPriceWithTax { get; set; }

#region Navigation Properties
    [ForeignKey("OrderId")] public Order Order { get; set; }
    [ForeignKey("CandyId")] public Dal::Candy Candy { get; set; }
#endregion
  }
}
