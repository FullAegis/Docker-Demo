using System.ComponentModel.DataAnnotations;

namespace Candy.BLL.Models.Products;

public record Category {
  [Required] public required int Id { get; init; }
  [Required] public required string Name { get; init; }
}
