import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminOrderService } from '../../../services/admin/admin-order.service';
import { Order } from '../../../models/order.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.css']
})
export class AdminOrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  error: string | null = null;

  // For filtering - can be expanded later
  // filterStatus: string = '';

  constructor(private adminOrderService: AdminOrderService) {
    this.orders$ = of([]); // Initialize
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.error = null;
    this.orders$ = this.adminOrderService.getAllOrders().pipe(
      catchError(err => {
        this.error = 'Failed to load orders: ' + err.message;
        console.error(err);
        return of([]); // Return empty array on error
      })
    );
  }

  // Placeholder for future filtering logic
  // applyFilter(): void {
  //   this.orders$ = this.adminOrderService.getAllOrders(this.filterStatus).pipe( ... );
  // }
}
