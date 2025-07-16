using System.Collections.ObjectModel;

namespace Candy.BLL.Mappers;
using Bll = Candy.BLL.Models.Orders;
using Dal = Candy.DAL.Models.Orders;

public static class OrdersMapper {
#region OrderItem
  public static Bll::OrderItem ToBll(this Dal::OrderItem oi) => new Bll::OrderItem
  { Id = oi.Id
  , OrderId = oi.OrderId
  , CandyId = oi.CandyId
  , Quantity = oi.Quantity
  , UnitPrice = oi.UnitPrice
  , TaxRate = oi.TaxRate
  , ItemTaxAmount = oi.ItemTaxAmount
  , ItemPriceWithTax = oi.ItemPriceWithTax
  , Candy = oi.Candy.ToBll()
  };
  
  public static Dal::OrderItem ToDal(this Bll::OrderItem oi) => new Dal::OrderItem
  { Id = oi.Id
  , OrderId = oi.OrderId
  , CandyId = oi.CandyId
  , Quantity = oi.Quantity
  , UnitPrice = oi.UnitPrice
  , TaxRate = oi.TaxRate
  , ItemTaxAmount = oi.ItemTaxAmount
  , ItemPriceWithTax = oi.ItemPriceWithTax
  , Candy = oi.Candy.ToDal()
  };
#endregion
#region Collections
  public static IEnumerable<Bll::Order> ToBll(this ICollection<Dal::Order> dal) {
    foreach (var o in dal) {
      yield return o.ToBll();
    }
  }
  
  public static IEnumerable<Bll::OrderItem> ToBll(this ICollection<Dal::OrderItem> dal) {
    foreach (var oi in dal) {
      yield return oi.ToBll();
    }
  }
  
  public static IEnumerable<Dal::Order> ToDal(this ICollection<Bll::Order> bll) {
    foreach (var o in bll) {
      yield return o.ToDal();
    }
  }
  
  public static IEnumerable<Dal::OrderItem> ToDal(this ICollection<Bll::OrderItem> bll) {
    foreach (var oi in bll) {
      yield return oi.ToDal();
    }
  }
#endregion
#region Order
  public static Bll::Order ToBll(this Dal::Order order) => new Bll::Order
  { Id = order.Id
  , UserId = order.UserId
  , OrderDate = order.OrderDate
  , Status = order.Status
  , TotalTaxAmount = order.TotalTaxAmount
  , TotalPriceWithTax = order.TotalPriceWithTax
  , OrderItems = order.OrderItems.ToBll().ToList()
  };
  
  public static Dal::Order ToDal(this Bll::Order order) => new Dal::Order
  { Id = order.Id
  , UserId = order.UserId
  , OrderDate = order.OrderDate
  , Status = order.Status
  , TotalTaxAmount = order.TotalTaxAmount
  , TotalPriceWithTax = order.TotalPriceWithTax
  , OrderItems = order.OrderItems.ToDal().ToList()
  };
#endregion  
}
