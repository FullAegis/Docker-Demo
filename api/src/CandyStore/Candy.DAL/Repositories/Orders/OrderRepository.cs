using Candy.DAL.Interfaces.Orders;
using Candy.DAL.Models.Orders;
using Microsoft.EntityFrameworkCore;

namespace Candy.DAL.Repositories.Orders;

public class OrderRepository(CandyDbContext context) : IOrderRepository {
  private readonly CandyDbContext _context = context;
  
  public List<Order> GetAll() => _context.Orders.ToList();

  public Order Get(int id) {
    var o = _context.Orders.FirstOrDefault(x => x.Id == id);
    ArgumentNullException.ThrowIfNull(o);
    return o;
  }

  public void Add(in Order entity) {
    _context.Orders.Add(entity);
    _context.SaveChanges();
  }

  public void Update(int id, in Order entity) {
    var o = Get(id);
    
    o.Id = entity.Id;
    o.UserId = entity.UserId;
    o.OrderDate = entity.OrderDate;
    o.Status = entity.Status;
    o.TotalTaxAmount = entity.TotalTaxAmount;
    o.TotalPriceWithTax = entity.TotalPriceWithTax;
    o.OrderItems = entity.OrderItems;
    
    _context.SaveChanges();
  }

  public void Delete(in Order entity) {
    _context.Orders.Remove(entity);
    _context.SaveChanges();
  }

  public void Delete(int id) {
    Delete(Get(id));
  }
  
  public List<Order> GetUserOrders(int userId) {
    var userOrders = _context.Orders
                             .Where(o => o.UserId == userId)
                             .Include(o => o.OrderItems)  // Avoids N+1 Problem.
                             .ThenInclude(oi => oi.Candy) // Again.
                             .OrderByDescending(o => o.OrderDate)
                             ;
    ArgumentNullException.ThrowIfNull(userOrders);
    return userOrders.ToList();
  }
};
