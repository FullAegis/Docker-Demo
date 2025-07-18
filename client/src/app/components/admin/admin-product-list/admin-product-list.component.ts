import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service'; // For fetching products
import { AdminProductService } from '../../../services/admin/admin-product.service'; // For deleting
import { Product } from '../../../models/product.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css']
})
export class AdminProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  error: string | null = null;
  successMessage: string | null = null;

  constructor(
    private productService: ProductService,
    private adminProductService: AdminProductService
  ) {
    this.products$ = of([]); // Initialize
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.error = null;
    this.successMessage = null;
    this.products$ = this.productService.getProducts().pipe(
      catchError(err => {
        this.error = 'Failed to load products: ' + err.message;
        console.error(err);
        return of([]); // Return empty array on error to prevent breaking the async pipe
      })
    );
  }

  deleteProduct(productId: string, productName: string): void {
    if (confirm(`Are you sure you want to delete product: ${productName} (ID: ${productId})?`)) {
      this.adminProductService.deleteProduct(productId).subscribe({
        next: () => {
          this.successMessage = `Product '${productName}' deleted successfully.`;
          this.error = null;
          this.loadProducts(); // Refresh the list
        },
        error: (err) => {
          this.error = `Failed to delete product '${productName}': ${err.message}`;
          this.successMessage = null;
          console.error(err);
        }
      });
    }
  }
}
