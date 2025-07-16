using Candy.DAL.Models.Products; // Category
using Candy.DAL.Interfaces;      // ICategoryRepository

namespace Candy.DAL.Repositories.Products;

public class CategoryRepository(CandyDbContext context) : ICategoryRepository {
  private readonly CandyDbContext _context = context;
  
  public List<Category> GetAll() => _context.Categories.ToList();

  public Category Get(int id) {
    var category = _context.Categories.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(category);
    return category;
  }

  public Category Get(string name) {
    var category = _context.Categories.FirstOrDefault(b => b.Name == name);
    ArgumentNullException.ThrowIfNull(category);
    return category;
  }

  public void Add(in Category category) {
    _context.Categories.Add(category);
    _context.SaveChanges();
  }
  
  public void Update(int id, in Category category) {
    var catToUpdate = _context.Categories.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(catToUpdate);
    Delete(catToUpdate);
    Add(category);
  }

  public void Delete(in Category category) {
    _context.Categories.Remove(category);
    _context.SaveChanges();
  }

  public void Delete(int id) {
    var cat = _context.Categories.FirstOrDefault(b => b.Id == id);
    ArgumentNullException.ThrowIfNull(cat);
    Delete(cat);
  }
};
