using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Candy.API.Mappers;
using Candy.BLL.Interfaces;

using Bll = Candy.BLL.Models.Products;
using Api = Candy.API.Models.DTO.Products;
namespace Candy.API.Controllers.Products;
[ApiController]
[Route("[controller]")]
public class CandiesController(ICandyService candyService) : ControllerBase {
  private readonly ICandyService _candyService = candyService;

  [HttpGet]
  public IActionResult GetAll() => Ok(_candyService.GetAll().ToDto());

  [HttpGet("{id:int}")]
  public IActionResult GetById(int id) => Ok(_candyService.Get(id).ToDto());

  [HttpPost]
  [Authorize(Roles = "Admin")]
  public IActionResult Create(Api::Candy candyDto) {
    if (ModelState.IsValid is false) {
      return BadRequest(ModelState);
    }

    try {
      _candyService.Create(candyDto.ToBll());
      return CreatedAtAction(nameof(GetById), new { id = candyDto.Id }, candyDto);
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id:int}")]
  [Authorize(Roles = "Admin")]
  public IActionResult Update(int id, Api::Candy candyDto) {
    if (ModelState.IsValid is false) {
      return BadRequest(ModelState);
    }

    if (id != candyDto.Id) {
      return BadRequest("ID mismatch");
    }

    try {
      _candyService.Update(id, candyDto.ToBll());
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Admin")]
  public IActionResult Delete(int id) {
    try {
      _candyService.Remove(id);
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id:int}/incrementstock")]
  [Authorize(Roles = "Admin")]
  public IActionResult IncrementStock(int id, [FromBody] uint quantity) {
    try {
      _candyService.IncrementStock(id, quantity);
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id:int}/decrementstock")]
  [Authorize(Roles = "Admin")]
  public IActionResult DecrementStock(int id, [FromBody] uint quantity) {
    try {
      _candyService.DecrementStock(id, quantity);
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpGet("{id:int}/taxfreeprice")]
  public IActionResult GetTaxFreePrice(int id) {
    try {
      var price = _candyService.TaxFreePrice(id);
      return Ok(price);
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }
}
