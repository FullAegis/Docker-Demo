using Candy.DAL.Models.Products;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Candy.DAL.Configurations.Products;

public class BrandConfig : IEntityTypeConfiguration<Brand> {
  public void Configure(EntityTypeBuilder<Brand> builder) {
    builder.ToTable(nameof(Brand))
           ;
    builder.HasKey(x => x.Id)
           .HasName("PK_Brand")
           ;
    builder.Property(x => x.Name)
           .HasColumnName("Name")
           .HasColumnType("nvarchar(128)")
           .IsRequired()
           ;
  }
};
