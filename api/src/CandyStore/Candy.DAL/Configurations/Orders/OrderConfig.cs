using Candy.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Candy.DAL.Configurations.Orders {
  using Order = Models.Orders.Order;
  public class OrderConfig : IEntityTypeConfiguration<Order> {
    public void Configure(EntityTypeBuilder<Order> builder) {
      builder.ToTable(nameof(Order))
             .HasKey(x => x.Id)
             ;
      builder.Property(o => o.Status)
             .IsRequired()
             .HasMaxLength(50)
             ;
      builder.Property(o => o.TotalTaxAmount)
             .HasColumnType("decimal(18, 2)")
             ;
      builder.Property(o => o.TotalPriceWithTax)
             .HasColumnType("decimal(18, 2)")
             ;
      builder.Property(o => o.OrderDate)
             .HasColumnType("datetime2")
             ;
      
      builder.HasOne(o => o.User) // [Order] 1 —— Belongs to —— 1 [User]
             .WithMany(u => u.Orders)
             .HasForeignKey(o => o.UserId)
             .HasConstraintName("FK_User_Orders_UserId")
             .OnDelete(DeleteBehavior.Restrict)
             ;
      builder.HasMany(o => o.OrderItems) // [Order] 1 —— Contains —— * [OrderItem]
             .WithOne(oi => oi.Order)
             .HasForeignKey(oi => oi.OrderId)
             .HasConstraintName("FK_OrderItem_Order_OrderId")
             .OnDelete(DeleteBehavior.Cascade)
             ;
    }
  }
}
