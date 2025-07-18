import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { AuthService } from '../auth/auth.service'; // For getting the token

@Injectable({
  providedIn: 'root'
})
export class AdminOrderService {
  private apiUrl = '/api/Orders'; // Base API URL from Candy.API/Controllers/Orders/OrdersController.cs

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened with order administration; please try again later.'));
  }

  private getAuthHeaders(): HttpHeaders | null {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No admin token available for authenticated request');
      return null;
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Fetch all orders for admin
  getAllOrders(): Observable<Order[]> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      // This should ideally not be reached if AdminGuard is effective
      return throwError(() => new Error('User not authenticated for this action.'));
    }
    // Assuming the backend /api/Orders endpoint, when called by an admin (identified by JWT),
    // returns all orders. If it's strictly user-scoped, a different endpoint like /api/Admin/Orders would be needed.
    return this.http.get<Order[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update the status of an order
  // The backend might expect a specific DTO or a simple string/object.
  // Let's assume PUT /api/Orders/{orderId}/status with a payload like { status: "newStatus" }
  // or that the backend OrderUpdateDTO can handle just a status change.
  // For simplicity, if the backend OrdersController has a PUT method that accepts an Order object
  // and updates fields based on what's provided, we can send a partial Order object.
  // A more specific endpoint like PUT /api/Orders/{orderId}/status with body "newStatus" is also common.
  // Let's assume a PATCH or PUT to /api/Orders/{orderId} that can update status.
  updateOrderStatus(orderId: string, status: string): Observable<Order | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('User not authenticated for this action.'));
    }
    // This payload structure { status: string } needs to be supported by the backend.
    // The backend OrdersController might have a specific DTO for status updates or a general update method.
    // For Candy.API, it seems the PUT method on /api/Orders/{id} takes an OrderDTO.
    // So we'd need to fetch the order, change status, then PUT the whole DTO, or have a dedicated status endpoint.
    // A dedicated endpoint is cleaner: PUT /api/Orders/{orderId}/status with body { newStatus }
    // Let's assume such an endpoint for now for cleaner frontend code.
    // If not, we'd fetch order, update status, then PUT the whole order.
    return this.http.put<Order>(`${this.apiUrl}/${orderId}/status`, { status }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Method to get a single order by ID (useful for AdminOrderDetailComponent)
  // This might be redundant if OrderService.getOrderById can be used by admins too,
  // but keeping it here for encapsulation of admin operations if needed.
  getOrderById(orderId: string): Observable<Order | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
        return throwError(() => new Error('User not authenticated for this action.'));
    }
    return this.http.get<Order>(`${this.apiUrl}/${orderId}`, { headers }).pipe(
        catchError(this.handleError)
    );
  }
}
