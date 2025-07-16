using Bll = Candy.BLL.Models.Orders;

namespace Candy.BLL.Interfaces;

public interface IOrderService {
  ICollection<Bll::Order> GetAll(int userId);
  void UpdateStatus(int orderId, in string status);
  void PlaceOrder(in Bll::Order order);

#region Async
  Task<ICollection<Bll::Order>> GetAllAsync(int userId);
  Task UpdateStatusAsync(int orderId, string status);
  Task PlaceOrderAsync(Bll::Order order);
#endregion
};
