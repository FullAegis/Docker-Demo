using System.ComponentModel.DataAnnotations;

namespace Candy.DAL.Models.Products {
public class Brand {
  [Key] public int Id { get; set; }
  [Required] [MaxLength(128)] public string Name { get; set; }
  // [Brand] 1 —— Has —— * [Candy] (cf: Diagrams/Entity Model) 
  public ICollection<Candy> Candies { get; set; }
};
}

