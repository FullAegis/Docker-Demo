import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'; // For navigation links

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Admin Dashboard</h2>
    <p>Welcome to the admin area.</p>
    <nav>
      <ul>
        <li><a routerLink="products">Manage Products</a></li>
        <li><a routerLink="orders">Manage Orders</a></li>
      </ul>
    </nav>
  `,
  styles: [`ul { list-style: none; padding: 0;} li { margin-bottom: 10px; }`]
})
export class AdminDashboardComponent {}
