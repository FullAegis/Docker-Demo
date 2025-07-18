import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, tap, catchError } from 'rxjs';
import { UserLogin, UserRegister, AuthResponse } from '../../models/auth.model'; // Models to be created
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiBaseUrl + environment.authPath;

  constructor(private http: HttpClient) { }

  login(credentials: UserLogin): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/Login`, credentials).pipe(
      tap(response => this.storeToken(response.token)),
      catchError(this.handleError)
    );
  }

  register(userInfo: UserRegister): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, userInfo).pipe(
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    // Add any other cleanup like redirecting the user or notifying other parts of the app
  }

  private storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Add more sophisticated token validation if needed (e.g., check expiration)
    return !!token;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later. Details logged to console.'));
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      // In a real app, you would decode the token here.
      // For now, let's assume a simple role or check if admin by a conventional username for example.
      // This is a placeholder and needs proper implementation if roles are in JWT.
      // const decodedToken = jwt_decode(token); // Example using a library
      // if (decodedToken && decodedToken.roles) return decodedToken.roles;
      // If the API provides user details separately, fetch them there.

      // Placeholder: if email in token (if it contains email) is admin@example.com, return ['ADMIN']
      // This is highly insecure and just for demonstration of the method's existence
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload && payload.email === 'admin@example.com') { // Assuming email is a claim
          return ['ADMIN_ROLE_FROM_TOKEN_PLACEHOLDER'];
        }
      } catch (e) {
        console.error('Error decoding token for roles', e);
        return [];
      }
    }
    return [];
  }
}
