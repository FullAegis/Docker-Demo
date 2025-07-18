import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'; // For status change
import { AdminOrderService } from '../../../services/admin/admin-order.service';
import { Order, OrderItem } from '../../../models/order.model'; // Assuming OrderItem is part of Order
import { Observable, of } from 'rxjs';
import { switchMap, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  order$: Observable<Order | null | undefined>; // undefined for initial, null if not found
  orderId: string | null = null;
  statusUpdateForm: FormGroup;
  isLoading: boolean = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Define possible order statuses - this should align with your backend enum/logic
  orderStatuses: string[] = ['pending', 'processed', 'shipped', 'delivered', 'canceled'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminOrderService: AdminOrderService,
    private fb: FormBuilder
  ) {
    this.order$ = of(undefined); // Initialize
    this.statusUpdateForm = this.fb.group({
      status: [''] // Will be patched with current order status
    });
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (this.orderId) {
      this.loadOrderDetails(this.orderId);
    } else {
      this.error = "No order ID provided.";
      this.order$ = of(null);
    }
  }

  loadOrderDetails(id: string): void {
    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    this.order$ = this.adminOrderService.getOrderById(id).pipe(
      tap(order => {
        if (order) {
          this.statusUpdateForm.patchValue({ status: order.status });
        } else {
            this.error = `Order with ID ${id} not found.`;
        }
        this.isLoading = false;
      }),
      catchError(err => {
        this.error = `Failed to load order details: ${err.message}`;
        this.isLoading = false;
        console.error(err);
        return of(null);
      })
    );
  }

  onStatusUpdate(): void {
    if (!this.orderId || this.statusUpdateForm.invalid) {
      this.error = "Invalid status selected or no order ID.";
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.successMessage = null;
    const newStatus = this.statusUpdateForm.value.status;

    this.adminOrderService.updateOrderStatus(this.orderId, newStatus).subscribe({
      next: (updatedOrder) => {
        this.isLoading = false;
        if (updatedOrder) {
          this.successMessage = `Order status updated to '${newStatus}'.`;
          // Refresh order details to show updated status consistently
          this.order$ = of(updatedOrder); // Update the observable with new order data
          this.statusUpdateForm.patchValue({ status: updatedOrder.status }); // Re-patch form
        } else {
            this.error = "Failed to update order status (no updated order returned)."
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = `Failed to update order status: ${err.message}`;
        // Optionally reload original order details on error to revert optimistic UI
        // if (this.orderId) this.loadOrderDetails(this.orderId);
      }
    });
  }
}
