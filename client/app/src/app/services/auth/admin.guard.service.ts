import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Correct path

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      const userRoles = this.authService.getUserRoles(); // Assuming this returns string[]
      // The placeholder role is 'ADMIN_ROLE_FROM_TOKEN_PLACEHOLDER'
      if (userRoles.includes('ADMIN_ROLE_FROM_TOKEN_PLACEHOLDER') || userRoles.includes('ADMIN')) { // Check for placeholder or a generic 'ADMIN'
        return true;
      } else {
        // Not an admin, redirect to home or a 'forbidden' page
        this.router.navigate(['/']); // Or '/forbidden'
        return false;
      }
    } else {
      // Not authenticated, redirect to login
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
