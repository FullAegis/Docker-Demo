import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // For address form
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Cart } from '../../models/cart.model';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<Cart>;
  checkoutForm: FormGroup;
  isProcessing: boolean = false;
  orderError: string | null = null;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.cart$ = this.cartService.cart$;
    this.checkoutForm = this.fb.group({
      // Basic address fields for now, can be expanded or tied to user profile
      fullName: ['', Validators.required],
      addressLine1: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
      // Add more fields like phone, etc. as needed
    });
  }

  ngOnInit(): void {
    // Potentially pre-fill form if user profile data is available
    // e.g., this.userService.getProfile().subscribe(profile => { ... });
  }

  get formControls() { return this.checkoutForm.controls; }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched(); // Mark fields as touched to show errors
      return;
    }

    this.isProcessing = true;
    this.orderError = null;
    const currentCart = await this.cartService.cart$.pipe(tap()).toPromise(); // Get current cart value

    if (!currentCart || currentCart.items.length === 0) {
      this.orderError = 'Your cart is empty.';
      this.isProcessing = false;
      return;
    }

    // Here you would ideally combine form values (shippingAddress) with the orderPayload
    // For simplicity, the OrderService.placeOrder payload is simplified and doesn't include address yet.
    // This would need alignment with the backend DTO.
    // const orderPayloadWithAddress = { ...currentCart, shippingAddress: this.checkoutForm.value };


    this.orderService.placeOrder(currentCart).subscribe({
      next: (order) => {
        this.isProcessing = false;
        if (order) {
          this.cartService.clearCart();
          // Navigate to an order confirmation page or order history
          // For now, navigate to order history, assuming order details can be seen there.
          // A dedicated order confirmation page would be better: /order-confirmation/order.id
          this.router.navigate(['/order-history']);
          alert('Order placed successfully! Order ID: ' + order.id); // Simple alert for now
        } else {
          this.orderError = 'Failed to place order. Please try again.';
        }
      },
      error: (err) => {
        this.isProcessing = false;
        this.orderError = 'An error occurred while placing your order. Please try again. Details: ' + err.message;
        console.error('Order placement error:', err);
      }
    });
  }
}
