using System.ComponentModel.DataAnnotations;

using Dto = Candy.API.Models.DTO.Products;
namespace Candy.API.Models.DTO.Products;
public class Candy {
  public int Id { get; set; }
  
  [Required] [MaxLength(128)]
  public required string Name { get; set; }
  
  [Required]
  public required Dto::Brand Brand { get; set; }
  [Required]
  public required Dto::Category Category { get; set; }
  
  [Required] [Range(1e-3, 1e+9)] // [0.001, 1_000_000_000]
  public required decimal PriceBeforeTax { get; set; }
};
