using Candy.DAL.Interfaces.Orders;
using Candy.DAL.Models.Orders;
using Microsoft.EntityFrameworkCore;

namespace Candy.DAL.Repositories.Orders;

public class OrderItemRepository(CandyDbContext context) : IOrderItemRepository {
  private readonly CandyDbContext _context = context;
  public List<OrderItem> GetAll() => _context.OrderItems.ToList();

  public OrderItem Get(int id) {
    var oi = _context.OrderItems.FirstOrDefault(i => i.Id == id);
    ArgumentNullException.ThrowIfNull(oi);
    return oi;
  }

  public void Add(in OrderItem entity) {
    _context.OrderItems.Add(entity);
    _context.SaveChanges();
  }

  public void Update(int id, in OrderItem entity) {
    var oiToUpdate = Get(id);
    
    oiToUpdate.Id = entity.Id;
    oiToUpdate.OrderId = entity.OrderId;
    oiToUpdate.CandyId = entity.CandyId;
    oiToUpdate.Quantity = entity.Quantity;
    oiToUpdate.UnitPrice = entity.UnitPrice;
    oiToUpdate.TaxRate = entity.TaxRate;
    oiToUpdate.ItemTaxAmount = entity.ItemTaxAmount;
    oiToUpdate.ItemPriceWithTax = entity.ItemPriceWithTax;
    
    _context.SaveChanges();
  }

  public void Delete(in OrderItem entity) {
    _context.OrderItems.Remove(entity);
    _context.SaveChanges();
  }

  public void Delete(int id) {
    var oi = Get(id);
    Delete(oi);
  }

  public OrderItem GetByOrderId(int orderId) {
    var oi = _context.OrderItems.FirstOrDefault(i => i.OrderId == orderId);
    ArgumentNullException.ThrowIfNull(oi);
    return oi;
  }

  public OrderItem GetWithDetails(int id) {
    var oi = _context.OrderItems
                     .Include(i => i.Candy) // Avoids the N+1 Problem.
                     .FirstOrDefault(i => i.Id == id)
                     ;
    ArgumentNullException.ThrowIfNull(oi);
    return oi;
  }
};
