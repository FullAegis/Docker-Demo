using Candy.DAL.Interfaces;      // IBrandRepository
using Candy.DAL.Models.Products; // Brand

namespace Candy.DAL.Repositories.Products;

public class BrandRepository(CandyDbContext context) : IBrandRepository {
  private readonly CandyDbContext _context = context;
  
  public List<Brand> GetAll() => _context.Brands.ToList();

  public Brand Get(int id) {
    var brand = _context.Brands.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(brand);
    return brand;
  }

  public Brand Get(string name) {
    var brand = _context.Brands.FirstOrDefault(b => b.Name == name);
    ArgumentNullException.ThrowIfNull(brand);
    return brand;
  }

  public void Add(in Brand brand) {
    _context.Brands.Add(brand);
    _context.SaveChanges();
  }
    
  public void Update(int id, in Brand brand) {
    var brandToUpdate = _context.Brands.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(brandToUpdate);
    brandToUpdate.Name = brand.Name;
    _context.SaveChanges();
  }
  
  public void Delete(in Brand brand) {
    _context.Brands.Remove(brand);
    _context.SaveChanges();
  }

  public void Delete(int id) {
    var brandToDelete = _context.Brands.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(brandToDelete);
    Delete(brandToDelete);
  }
};
