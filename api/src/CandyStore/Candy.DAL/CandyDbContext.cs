using Microsoft.EntityFrameworkCore;

using Candy.DAL.Models;
using Candy.DAL.Models.Orders;
using Candy.DAL.Models.Products;

namespace Candy.DAL {
using CandyDbCtxOpts = DbContextOptions<CandyDbContext>;
using Candy = Models.Products.Candy;

public class CandyDbContext : DbContext {
#region Users.DbSet
  public DbSet<User> Users { get => Set<User>(); }
#endregion
#region Products.DbSet
  public DbSet<Brand> Brands { get => Set<Brand>(); }
  public DbSet<Candy> Candies { get => Set<Candy>(); }
  public DbSet<Category> Categories { get => Set<Category>(); }
#endregion
#region Orders.DbSet
  public DbSet<Order> Orders { get => Set<Order>(); }
  public DbSet<OrderItem> OrderItems { get => Set<OrderItem>(); }
#endregion

  public CandyDbContext(CandyDbCtxOpts options)
    : base(options)
  => Database.EnsureCreated(); 

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
    base.OnConfiguring(optionsBuilder);
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder) {
    modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
  }
};
}
