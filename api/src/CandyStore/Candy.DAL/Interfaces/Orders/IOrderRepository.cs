namespace Candy.DAL.Interfaces.Orders;
using Dal = Candy.DAL.Models.Orders;

public interface IOrderRepository : IRepository<Dal::Order> {
  List<Dal::Order> GetUserOrders(int userId);
};
