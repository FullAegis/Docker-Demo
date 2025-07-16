using Candy.DAL.Interfaces;      // ICandyRepository
using Candy.DAL.Models.Products; // Candy

namespace Candy.DAL.Repositories.Products;
using Candy = Candy.DAL.Models.Products.Candy;

public class CandyRepository(CandyDbContext context) : ICandyRepository {
  private readonly CandyDbContext _context = context;


  public List<Candy> GetAll() => _context.Candies.ToList();
  public List<Candy> GetAll(Category category)
  => _context.Candies.Where(c => c.Category == category).ToList();
  
  public List<Candy> GetAll(Brand brand)
  => _context.Candies.Where(c => c.Brand == brand).ToList();

  public Candy Get(int id) {
    var candy =  _context.Candies.FirstOrDefault(c => c.Id == id);
    ArgumentNullException.ThrowIfNull(candy);
    return candy;
  }

  public Candy Get(string name) {
    var candy = _context.Candies.FirstOrDefault(c => c.Name == name);
    ArgumentNullException.ThrowIfNull(candy);
    return candy;
  }

  public void Add(in Candy candy) {
    _context.Candies.Add(candy);
    _context.SaveChanges();
  }

  public void Update(int id, in Candy candy) {
    var candyToUpdate = Get(id: id);
    
    candyToUpdate.Name = candy.Name;
    candyToUpdate.Category = candy.Category;
    candyToUpdate.Brand = candy.Brand;
    candyToUpdate.PriceBeforeTax = candy.PriceBeforeTax;
    
    _context.SaveChanges();
  }

  public void Delete(in Candy candy) {
    _context.Candies.Remove(candy);
    _context.SaveChanges();
  }

  public void Delete(int id) {
    var candyToDelete = Get(id: id);
    Delete(candyToDelete);
  }
};
