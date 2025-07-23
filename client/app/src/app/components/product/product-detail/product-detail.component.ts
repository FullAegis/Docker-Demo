import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For async pipe, *ngIf
import { ActivatedRoute, RouterLink } from '@angular/router'; // RouterLink for back button
import { ProductService } from '../../../services/product.service'; // Adjusted path
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product.model'; // Adjusted path
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink], // Added RouterLink
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'] // Corrected to styleUrls
})
export class ProductDetailComponent implements OnInit { // Renamed class
  product$: Observable<Product | null | undefined>; // Product can be null if not found or undefined during loading

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.product$ = of(undefined); // Initialize with undefined
  }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.productService.getProductById(id);
        } else {
          return of(null); // No ID, return null product
        }
      })
    );
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    // Optionally, add some user feedback
    console.log(product.name + ' added to cart');
  }
}
