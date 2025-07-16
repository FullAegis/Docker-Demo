namespace Candy.BLL.Mappers;

using Bll = Candy.BLL.Models.Products;
using Dal = Candy.DAL.Models.Products;

public static class ProductsMapper {
#region Brand
  public static Bll::Brand ToBll(this Dal::Brand brand)
  => new Bll::Brand { Id = brand.Id, Name = brand.Name };
  
  public static Dal::Brand ToDal(this Bll::Brand brand)
  => new Dal::Brand { Id = brand.Id, Name = brand.Name };
#endregion
#region Category
  public static Bll::Category ToBll(this Dal::Category category)
  => new Bll::Category { Id = category.Id, Name = category.Name };
  
  public static Dal::Category ToDal(this Bll::Category category)
  => new Dal::Category { Id = category.Id, Name = category.Name };
#endregion
#region Candy
  public static Bll::Candy ToBll(this Dal::Candy candy) => new Bll::Candy
  { Id = candy.Id
  , Name = candy.Name
  , Brand = candy.Brand.ToBll()
  , Category = candy.Category.ToBll()
  , PriceBeforeTax = candy.PriceBeforeTax
  };
  
  public static Dal::Candy ToDal(this Bll::Candy candy) => new Dal::Candy
  { Id = candy.Id
  , Name = candy.Name
  , Brand = candy.Brand.ToDal()
  , Category = candy.Category.ToDal()
  , PriceBeforeTax = candy.PriceBeforeTax
  };
#endregion

#region Collections
  

#endregion
};
