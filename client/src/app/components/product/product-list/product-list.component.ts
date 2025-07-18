import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, async pipe
import { RouterLink } from '@angular/router'; // For routerLink
import { ProductService } from '../../../services/product.service'; // Adjusted path
import { CartService } from '../../../services/cart.service';
import { Product, Category } from '../../../models/product.model'; // Adjusted path
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; // To read route parameters

@Component({
  selector: 'app-product-list',
  standalone: true, // Make it standalone
  imports: [CommonModule, RouterLink], // Import CommonModule and RouterLink
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'] // Corrected from styleUrl to styleUrls
})
export class ProductListComponent implements OnInit { // Renamed class
  products$: Observable<Product[]> = of([]);
  categories$: Observable<Category[]> = of([]);
  selectedCategoryId?: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, // For potential future use with route param filtering
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Check for category query parameter (example: /products?category=categoryId)
    this.route.queryParamMap.subscribe(params => {
      const categoryId = params.get('category');
      if (categoryId) {
        this.selectedCategoryId = categoryId;
        this.filterByCategory(categoryId);
      } else {
        this.loadAllProducts();
      }
    });
    this.loadCategories();
  }

  loadAllProducts(): void {
    this.products$ = this.productService.getProducts();
    this.selectedCategoryId = undefined;
  }

  loadCategories(): void {
    this.categories$ = this.productService.getCategories();
  }

  filterByCategory(categoryId: string | null): void {
    if (categoryId === null) {
        this.loadAllProducts();
        return;
    }
    this.selectedCategoryId = categoryId;
    this.products$ = this.productService.getProducts(categoryId);
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    // Optionally, add some user feedback like a toast message
    console.log(product.name + ' added to cart');
  }
}
