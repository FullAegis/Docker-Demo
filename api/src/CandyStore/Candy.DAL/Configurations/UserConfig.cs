using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Candy.DAL.Models;

namespace Candy.DAL.Configurations {

  public class UserConfig : IEntityTypeConfiguration<User> {
    public void Configure(EntityTypeBuilder<User> builder) {
      builder.ToTable(nameof(User))
             ;
      builder.HasKey(u => u.Id)
             .HasName("PK_User")
             ;
      builder.Property(u => u.Email)
             .HasColumnType("nvarchar(128)")
             ;
      builder.Property(u => u.Password)
             .HasColumnType("nvarchar(max)")
             .IsRequired()
             ;
      builder.Property(u => u.FirstName)
             .HasColumnType("nvarchar(128)")
             ;
      builder.Property(u => u.LastName)
             .HasColumnType("nvarchar(128)")
             ;
      builder.Property(u => u.Role)
             .HasColumnName("Role")
             .HasColumnType("smallint")
             .HasDefaultValue(UserRole.Customer)
             ;
    }
  };
}
