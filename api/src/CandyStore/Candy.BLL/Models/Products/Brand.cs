using System.ComponentModel.DataAnnotations;

namespace Candy.BLL.Models.Products;
public class Brand {
  public int Id { get; set; }
  [Required] [MaxLength(128)] public string Name { get; set; }
};
