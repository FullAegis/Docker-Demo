using Candy.BLL.Interfaces;
using Candy.BLL.Mappers;
using Candy.BLL.Models.Products;
using Candy.DAL.Interfaces;

namespace Candy.BLL.Services.Products;

public class BrandService(IBrandRepository brandRepository) : IBrandService {
  private readonly IBrandRepository _brandRepository = brandRepository;
  
  public List<Brand> GetAll() => _brandRepository.GetAll()
                                                 .ConvertAll<Brand>(b => b.ToBll())
                                                 ;

  public Brand Get(int id) => _brandRepository.Get(id: id).ToBll();
  public void Create(in Brand brand) => _brandRepository.Add(brand.ToDal());
  public void Update(int id, in Brand brand) => _brandRepository.Update(id, brand.ToDal());
  public void Remove(int id) => _brandRepository.Delete(id);
  public void Remove(in Brand brand) => Remove(brand.Id); 
}
