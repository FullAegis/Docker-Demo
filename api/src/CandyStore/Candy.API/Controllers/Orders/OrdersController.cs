using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Candy.BLL.Interfaces;
using Candy.API.Mappers;

using Api = Candy.API.Models.DTO.Orders;
using Role = Candy.DAL.Models.UserRole;
namespace Candy.API.Controllers.Orders;
[ApiController]
[Route("[controller]")]
public class OrdersController(IOrderService orderService) : ControllerBase {
  private readonly IOrderService _orderService = orderService;

  [HttpPost]
  [Authorize(Roles = $"{nameof(Role.Admin)}, {nameof(Role.Customer)}")]
  public async Task<IActionResult> PlaceOrder([FromBody] Api::PlaceOrderRequestDto orderRequest) {
    if (ModelState.IsValid is false) {
      return BadRequest(ModelState);
    }
    
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

    if (userIdClaim is null 
    || int.TryParse(userIdClaim.Value, out int userId) is false) {
      return Unauthorized();
    }

    try {
      var order = orderRequest.ToBll();
      order.UserId = userId; // Set user ID from authenticated user
      await Task.Run(() => _orderService.PlaceOrderAsync(order));
      return CreatedAtAction(nameof(GetMyOrders), new { userId = userId }, order.ToApi());
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpGet("my")]
  [Authorize(Roles = $"{nameof(Role.Admin)}, {nameof(Role.Customer)}")]
  public async Task<IActionResult> GetMyOrders() {
    var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

    if (userIdClaim is null 
    || int.TryParse(userIdClaim.Value, out int userId) is false) {
      return Unauthorized();
    }

    try {
      var orders = await Task.Run(() => _orderService.GetAll(userId: userId));
      return Ok(orders.Select(o => o.ToApi()));
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id:int}/status")]
  [Authorize(Roles = nameof(Role.Admin))]
  public async Task<IActionResult> UpdateStatus(int id, [FromBody] string status) {
    if (string.IsNullOrEmpty(status)) {
      return BadRequest("Status cannot be empty.");
    }

    try {
      await Task.Run(() => _orderService.UpdateStatus(id, status));
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }
}
