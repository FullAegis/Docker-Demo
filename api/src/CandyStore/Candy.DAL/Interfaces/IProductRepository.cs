namespace Candy.DAL.Interfaces;
using Dal = Candy.DAL.Models.Products;

public interface IProductRepository <T> : IRepository<T> where T : class {
  T Get(string name);
}

public interface ICategoryRepository : IProductRepository<Dal::Category>;
public interface IBrandRepository    : IProductRepository<Dal::Brand>;
public interface ICandyRepository    : IProductRepository<Dal::Candy> {
  List<Dal::Candy> GetAll(Dal::Category category);
  List<Dal::Candy> GetAll(Dal::Brand brand);
};
