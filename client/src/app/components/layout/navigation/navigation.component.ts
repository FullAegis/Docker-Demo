import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule], // Add CommonModule
  templateUrl: './navigation.component.html', // Corrected to navigation.html
  // styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
