namespace Candy.API.Models.DTO.Orders;
public class OrderItemResponseDto {
  public int Id { get; set; }
  public int ProductId { get; set; }
  public string ProductName { get; set; }
  public uint Quantity { get; set; }
  public decimal UnitPrice { get; set; }
}
