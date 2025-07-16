using Candy.BLL.Models.Products;

namespace Candy.BLL.Models.Orders;
using Bll = Candy.BLL.Models.Products;

public class OrderItem {
  public int Id { get; set; }

  public int OrderId { get; set; }
  public int CandyId { get; set; }

  public uint Quantity { get; set; }

  public decimal UnitPrice { get; set; }

  public decimal TaxRate { get; set; }

  public decimal ItemTaxAmount { get; set; }

  public decimal ItemPriceWithTax { get; set; }
  
  public Bll::Candy Candy { get; set; }
};
