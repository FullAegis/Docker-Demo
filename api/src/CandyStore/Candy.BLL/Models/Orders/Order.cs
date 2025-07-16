using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Candy.BLL.Models.Products;
using Bll = Candy.BLL.Models.Orders;

namespace Candy.BLL.Models.Orders;
public class Order {
  public int Id { get; set; }
  public int UserId { get; set; }
  
  public DateTime OrderDate { get; set; }
  
  public string Status { get; set; }
  
  public decimal TotalTaxAmount { get; set; }
  public decimal TotalPriceWithTax { get; set; }
  
  public ICollection<Bll::OrderItem> OrderItems { get; set; }
};
