import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserProfile } from '../../models/user.model';
import { AuthService } from '../auth/auth'; // Corrected path from ../auth/auth.ts

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/Users'; // Example API URL, adjust as needed. Assumes proxy or same-origin.

  constructor(private http: HttpClient, private authService: AuthService) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError(() => new Error('Something bad happened with user data; please try again later.'));
  }

  getProfile(): Observable<UserProfile | null> {
    const token = this.authService.getToken();
    if (!token) {
      // Optionally, could return an observable error or redirect via a different mechanism
      console.error('No token available for getProfile');
      return of(null); // Or throwError(() => new Error('Not authenticated'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Assuming the API returns the user profile directly at an endpoint like /api/Users/profile
    // Or, if the user's ID is part of the JWT, you might need to fetch /api/Users/{userId}
    // For now, let's assume a /profile endpoint on this service.
    // The actual backend API structure (e.g. from Candy.API/Controllers/AuthController.cs or a new UserController) will dictate this.
    // Let's assume the API provides a specific endpoint for the current user's profile, e.g., this.apiUrl + '/profile'
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateProfile(profileData: UserProfile): Observable<UserProfile | null> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available for updateProfile');
      return of(null); // Or throwError(() => new Error('Not authenticated'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Assuming the API expects a PUT request to an endpoint like /api/Users/profile or /api/Users/{userId}
    // For now, using /profile, and assuming profileData contains the necessary ID if API expects /api/Users/{id}
    return this.http.put<UserProfile>(`${this.apiUrl}/profile`, profileData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Placeholder for fetching order history - this might move to OrderService
  // getOrderHistory(): Observable<any[]> {
  //   const token = this.authService.getToken();
  //   if (!token) return of([]);
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.get<any[]>(`${this.apiUrl}/orders`, { headers }).pipe( // Assuming an /orders endpoint
  //     catchError(this.handleError)
  //   );
  // }
}
