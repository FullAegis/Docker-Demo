using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Candy.API.Mappers;
using Candy.BLL.Interfaces;

using Api = Candy.API.Models.DTO.Products;
using Bll = Candy.BLL.Models.Products;
namespace Candy.API.Controllers.Products;
[ApiController]
[Route("[controller]")]
public class CategoriesController(ICategoryService categoryService) : ControllerBase {
  private readonly ICategoryService _categoryService = categoryService;

  [HttpGet]
  public IActionResult GetAll() {
    var categories = _categoryService.GetAll();
    return Ok(categories.Select(c => c.ToDto()));
  }

  [HttpGet("{id:int}")]
  public IActionResult GetById(int id) {
    var category = _categoryService.Get(id);

    return Ok(category.ToDto());
  }

  [HttpPost]
  [Authorize(Roles = "Admin")]
  public IActionResult Create(Api::Category categoryDto) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    try {
      _categoryService.Create(categoryDto.ToBll());
      return CreatedAtAction(nameof(GetById), new { id = categoryDto.Id }, categoryDto);
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpPut("{id:int}")]
  [Authorize(Roles = "Admin")]
  public IActionResult Update(int id, Api::Category categoryDto) {
    if (!ModelState.IsValid) {
      return BadRequest(ModelState);
    }

    if (id != categoryDto.Id) {
      return BadRequest("ID mismatch");
    }

    try {
      _categoryService.Update(id, categoryDto.ToBll());
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }

  [HttpDelete("{id:int}")]
  [Authorize(Roles = "Admin")]
  public IActionResult Delete(int id) {
    try {
      _categoryService.Remove(id);
      return NoContent();
    } catch (Exception ex) {
      return BadRequest(ex.Message);
    }
  }
}
