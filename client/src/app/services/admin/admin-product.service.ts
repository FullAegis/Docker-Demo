import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../../models/product.model'; // Assuming Product model is sufficient for payload
import { AuthService } from '../auth/auth.service'; // For getting the token

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
  private apiUrl = '/api/Candies'; // From Candy.API/Controllers/Products/CandiesController.cs

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Consider more specific error messages based on status codes if needed
    return throwError(() => new Error('Something bad happened with product management; please try again later.'));
  }

  private getAuthHeaders(): HttpHeaders | null {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No admin token available for authenticated request');
      // This should ideally not happen if AdminGuard is working correctly
      return null;
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Create a new product
  // The backend expects a DTO (e.g., CandyCreateDTO).
  // We assume 'Product' model fields are compatible or a subset.
  // The 'id' should likely be omitted for creation or handled by backend.
  createProduct(productData: Omit<Product, 'id'>): Observable<Product | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('User not authenticated for this action.'));
    }
    return this.http.post<Product>(this.apiUrl, productData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing product
  // Backend expects CandyUpdateDTO. Assuming 'Product' model is compatible.
  updateProduct(productId: string, productData: Partial<Product>): Observable<Product | null> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('User not authenticated for this action.'));
    }
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, productData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a product
  deleteProduct(productId: string): Observable<void | null> { // Returns Observable<void> on success
    const headers = this.getAuthHeaders();
    if (!headers) {
      return throwError(() => new Error('User not authenticated for this action.'));
    }
    return this.http.delete<void>(`${this.apiUrl}/${productId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
