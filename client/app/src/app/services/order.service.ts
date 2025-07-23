import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order, OrderItem } from '../models/order.model'; // Assuming OrderItem might be part of placeOrder payload
import { Cart } from '../models/cart.model'; // Needed for placeOrder
import { AuthService } from './auth/auth.service'; // For getting the token
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // Assuming API base from Candy.API/Controllers/Orders/OrdersController.cs is /api/Orders
  private baseUrl = environment.apiBaseUrl + environment.apiPath + '/Orders';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened with order processing; please try again later.'));
  }

  private getAuthHeaders(): HttpHeaders | null {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available for authenticated request');
      return null;
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Place an order
  placeOrder(cart: Cart): Observable<Order | null> { // API might expect a different payload, e.g. just items and total
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('User not authenticated to place order.'));
      // Or return of(null) if you want to handle it differently in the component
    }

    // The backend API for placing an order (e.g., POST /api/Orders)
    // will dictate the exact payload. It might expect a structure like:
    // { userId (taken from JWT), items: CartItem[], totalAmount: number, shippingAddress: ..., etc. }
    // For now, let's construct a simplified payload.
    // The backend OrderDTO likely doesn't need the full Cart object from frontend.
    const orderPayload = {
      // userId will likely be extracted from the JWT token on the backend
      orderItems: cart.items.map(item => ({ // Map to OrderItemDTO structure if different
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price // Assuming API calls it unitPrice
      })),
      totalAmount: cart.grandTotal
      // shippingAddress, billingAddress, etc. would be added here if collected
    };

    return this.http.post<Order>(this.baseUrl, orderPayload, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get order history for the logged-in user
  getOrderHistory(): Observable<Order[]> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of([]); // Or throwError
    }
    // Assuming GET /api/Orders returns orders for the authenticated user
    return this.http.get<Order[]>(this.baseUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a specific order by its ID
  getOrderById(id: string): Observable<Order | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return of(null); // Or throwError
    }
    return this.http.get<Order>(`${this.baseUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
