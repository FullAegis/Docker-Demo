using Candy.BLL.Interfaces;
using Candy.BLL.Mappers;
using Candy.BLL.Models.Orders;
using Candy.DAL.Interfaces;
using Candy.DAL.Interfaces.Orders;

namespace Candy.BLL.Services.Orders;
public class OrderService(IOrderRepository orderRepository, IUserRepository userRepository)
  : IOrderService
{
  private readonly IOrderRepository _orderRepository = orderRepository;
  
  public ICollection<Order> GetAll(int userId) {
    return (ICollection<Order>) _orderRepository.GetUserOrders(userId);
  }

  public void UpdateStatus(int orderId, in string status) {
    var order = _orderRepository.Get(id: orderId);
    order.Status = status;
    _orderRepository.Update(id: orderId, order);
  }

  public void PlaceOrder(in Order order) {
    _orderRepository.Add(order.ToDal());
  }

#region Async
  public async Task<ICollection<Order>> GetAllAsync(int userId) {
    throw new NotImplementedException();
  }

  public async Task UpdateStatusAsync(int orderId, string status) {
    throw new NotImplementedException();
  }

  public async Task PlaceOrderAsync(Order order) {
    throw new NotImplementedException();
  }
#endregion
}
