import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngFor, *ngIf, async pipe, currency pipe
import { RouterLink } from '@angular/router'; // For "Continue Shopping" or "Checkout" links
import { CartService } from '../../../services/cart.service'; // Adjusted path
import { Cart, CartItem } from '../../../models/cart.model'; // Adjusted path
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'] // Corrected to styleUrls
})
export class CartComponent { // Renamed class
  cart$: Observable<Cart>;

  constructor(private cartService: CartService) {
    this.cart$ = this.cartService.cart$;
  }

  updateQuantity(item: CartItem, quantityChange: number): void {
    const newQuantity = item.quantity + quantityChange;
    if (newQuantity < 1) {
      this.cartService.removeItem(item.productId);
    } else {
      this.cartService.updateItemQuantity(item.productId, newQuantity);
    }
  }

  // Alternative update quantity if using an input field
  setQuantity(item: CartItem, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = parseInt(inputElement.value, 10);
    if (isNaN(newQuantity) || newQuantity < 1) {
        // Optionally reset to current quantity or handle error
        inputElement.value = item.quantity.toString(); // Reset if invalid
        if (newQuantity < 1 && !isNaN(newQuantity)) { // if 0 or negative, remove
             this.cartService.removeItem(item.productId);
        }
        return;
    }
    this.cartService.updateItemQuantity(item.productId, newQuantity);
  }


  removeItem(productId: string): void {
    this.cartService.removeItem(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
