import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; // DatePipe for formatting dates
import { RouterLink } from '@angular/router'; // For linking to order details if needed
import { OrderService } from '../../../services/order.service'; // Adjusted path
import { Order } from '../../../models/order.model'; // Adjusted path
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe], // Added DatePipe
  templateUrl: './order-history.html',
  styleUrls: ['./order-history.css'] // Corrected to styleUrls
})
export class OrderHistoryComponent implements OnInit { // Renamed class
  orders$: Observable<Order[]> = of([]); // Initialize with empty array

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.orderService.getOrderHistory();
  }

  // Optional: Method to allow re-fetching or pagination in future
  loadOrderHistory(): void {
    this.orders$ = this.orderService.getOrderHistory();
  }
}
