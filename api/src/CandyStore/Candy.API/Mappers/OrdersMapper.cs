using Bll = Candy.BLL.Models.Orders;
using Api = Candy.API.Models.DTO.Orders;
namespace Candy.API.Mappers;
public static class OrdersMapper {
  public static Bll::Order ToBll(this Api::PlaceOrderRequestDto orderDto)
  => new Bll::Order { OrderItems = orderDto.OrderItems.Select(oi => oi.ToBll()).ToList() };

  public static Bll::OrderItem ToBll(this Api::OrderItemDto orderItemDto)
  => new Bll::OrderItem { Id = orderItemDto.ProductId, Quantity = orderItemDto.Quantity };

  public static Api::OrderResponseDto ToApi(this Bll::Order order) => new Api::OrderResponseDto
  { Id = order.Id
  , UserId = order.UserId
  , OrderDate = order.OrderDate
  , Status = order.Status.ToString()
  , OrderItems = order.OrderItems.Select(oi => oi.ToApi()).ToList()
  };
  
  public static Api::OrderItemResponseDto ToApi(this Bll::OrderItem orderItem) 
  => new Api::OrderItemResponseDto 
  { Id = orderItem.Id
  , ProductId = orderItem.CandyId
  , ProductName = orderItem.Candy.Name
  , Quantity = orderItem.Quantity
  , UnitPrice = orderItem.UnitPrice
  };
};
