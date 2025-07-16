using Candy.DAL.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Candy.DAL.Configurations.Products;

public class CategoryConfig : IEntityTypeConfiguration<Category> {
  public void Configure(EntityTypeBuilder<Category> builder) {
    builder.ToTable(nameof(Category))
           ;
    builder.HasKey(x => x.Id)
           .HasName("PK_Category")
           ;
    builder.Property(x => x.Name)
           .HasColumnName("Name")
           .HasColumnType("nvarchar(100)")
           .IsRequired()
           ;
    
  }
};
