using Bll = Candy.BLL.Models.Products;
using Dto = Candy.API.Models.DTO.Products;

namespace Candy.API.Mappers;
public static class ProductsMapper {
#region Brand
  public static Bll::Brand ToBll(this Dto::Brand brand)
  => new Bll::Brand { Id = brand.Id, Name = brand.Name };
  
  public static Dto::Brand ToDto(this Bll::Brand brand)
  => new Dto::Brand { Id = brand.Id, Name = brand.Name };
  
  public static List<Dto::Brand> ToDto(this List<Bll::Brand> brands)
  => brands.ConvertAll<Dto::Brand>(b => b.ToDto());
#endregion
#region Category
  public static Bll::Category ToBll(this Dto::Category category)
  => new Bll::Category { Id = category.Id, Name = category.Name };
  
  public static Dto::Category ToDto(this Bll::Category category)
  => new Dto::Category { Id = category.Id, Name = category.Name };
  
  public static List<Dto::Category> ToDto(this List<Bll::Category> cats)
  => cats.ConvertAll<Dto::Category>(c => c.ToDto());
#endregion
#region Candy
  public static Bll::Candy ToBll(this Dto::Candy candy) => new Bll::Candy
  { Id = candy.Id
  , Name = candy.Name
  , Brand = candy.Brand.ToBll()
  , Category = candy.Category.ToBll()
  , PriceBeforeTax = candy.PriceBeforeTax
  };
  
  public static Dto::Candy ToDto(this Bll::Candy candy) => new Dto::Candy
  { Id = candy.Id
  , Name = candy.Name
  , Brand = candy.Brand.ToDto()
  , Category = candy.Category.ToDto()
  , PriceBeforeTax = candy.PriceBeforeTax
  };
  
  public static List<Dto::Candy> ToDto(this List<Bll::Candy> candies)
  => candies.ConvertAll<Dto::Candy>(c => c.ToDto());
#endregion
};
