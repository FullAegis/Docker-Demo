namespace Candy.API.Models.DTO.Orders;
public class OrderResponseDto {
  public int Id { get; set; }
  public int UserId { get; set; }
  public DateTime OrderDate { get; set; }
  public string Status { get; set; }
  public IEnumerable<OrderItemResponseDto> OrderItems { get; set; }
}
