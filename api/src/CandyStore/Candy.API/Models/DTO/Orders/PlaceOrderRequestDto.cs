namespace Candy.API.Models.DTO.Orders;
public class PlaceOrderRequestDto {
  public IEnumerable<OrderItemDto> OrderItems { get; set; }
}
