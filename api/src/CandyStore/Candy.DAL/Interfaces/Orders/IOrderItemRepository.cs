namespace Candy.DAL.Interfaces.Orders;
using Dal = Candy.DAL.Models.Orders;

public interface IOrderItemRepository : IRepository<Dal::OrderItem> {
  Dal::OrderItem GetByOrderId(int orderId);
  Dal::OrderItem GetWithDetails(int id);
};
