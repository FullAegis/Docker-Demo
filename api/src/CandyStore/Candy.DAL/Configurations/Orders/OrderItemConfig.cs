using Candy.DAL.Models.Orders;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Candy.DAL.Configurations.Order {
  public class OrderItemConfig : IEntityTypeConfiguration<OrderItem> {
    public void Configure(EntityTypeBuilder<OrderItem> builder) {
      builder.ToTable(nameof(OrderItem))
             .HasKey(oi => oi.Id)
             ;
      builder.Property(oi => oi.Quantity)
             .IsRequired()
             ;
      builder.Property(oi => oi.UnitPrice)
             .IsRequired()
             ;
      builder.Property(oi => oi.TaxRate)
             .IsRequired()
             ;
      builder.Property(oi => oi.ItemTaxAmount)
             .IsRequired()
             ;
      builder.Property(oi => oi.ItemPriceWithTax)
             .IsRequired()
             ;
      builder.Property(oi => oi.UnitPrice)
             .HasColumnType("decimal(18, 2)")
             ;
      builder.Property(oi => oi.TaxRate)
             .HasColumnType("decimal(5, 4)")
             ;
      builder.Property(oi => oi.ItemTaxAmount)
             .HasColumnType("decimal(18, 2)")
             ;
      builder.Property(oi => oi.ItemPriceWithTax)
             .HasColumnType("decimal(18, 2)")
             ;

      // [OrderItem] 1 —— Belongs to —— 1 [Order]
      //     [Order] 1 ————— Has —————— * [OrderItem] 
      builder.HasOne(oi => oi.Order)
             .WithMany(o => o.OrderItems)
             .HasForeignKey(oi => oi.OrderId)
             .HasConstraintName("FK_Order_OrderItem_OrderId")
             .OnDelete(DeleteBehavior.Cascade) // Delete OrderItem when Order deleted
             ;

      // [OrderItem] 1 —— Belongs to —— 1 [Candy]
      builder.HasOne(oi => oi.Candy)
             .WithMany(c => c.OrderItems)
             .HasForeignKey(oi => oi.CandyId)
             .HasConstraintName("FK_Candy_OrderItem_CandyId")
             .OnDelete(DeleteBehavior.Restrict)
             ;
    }
  }
}
