import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <header class="admin-header">
        <h1>Admin Panel</h1>
        <nav>
          <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Dashboard</a> |
          <a routerLink="/admin/products" routerLinkActive="active">Products</a> |
          <a routerLink="/admin/orders" routerLinkActive="active">Orders</a> |
          <a routerLink="/" >Back to Site</a>
        </nav>
      </header>
      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { display: flex; flex-direction: column; min-height: 100vh; }
    .admin-header { background-color: #333; color: white; padding: 15px; text-align: center; }
    .admin-header nav a { color: white; margin: 0 10px; text-decoration: none; }
    .admin-header nav a.active { font-weight: bold; text-decoration: underline; }
    .admin-content { padding: 20px; flex-grow: 1; }
  `]
})
export class AdminLayoutComponent {}
