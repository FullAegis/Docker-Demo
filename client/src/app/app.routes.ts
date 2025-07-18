import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductDetailComponent } from './components/product/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrderHistoryComponent } from './components/order/order-history/order-history.component';
import { ProfileComponent } from './components/user/profile/profile.component';
// import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component'; // Placeholder for future
// import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component'; // Placeholder for future
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './services/auth/auth.guard.service';
import { AdminGuard } from './services/auth/admin.guard.service'; // Import AdminGuard
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component'; // Import AdminLayout
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component'; // Import AdminDashboard
import { AdminProductListComponent } from './components/admin/admin-product-list/admin-product-list.component'; // Add this
import { AdminProductFormComponent } from './components/admin/admin-product-form/admin-product-form.component'; // Add this
import { AdminOrderListComponent } from './components/admin/admin-order-list/admin-order-list.component'; // Add this
import { AdminOrderDetailComponent } from './components/admin/admin-order-detail/admin-order-detail.component'; // Add this


export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard] // Added AuthGuard
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent,
    canActivate: [AuthGuard] // Added AuthGuard
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AuthGuard]
  },
  // Admin Routes
  {
    path: 'admin',
    component: AdminLayoutComponent, // Use AdminLayoutComponent here
    canActivate: [AdminGuard],       // Protect all child routes
    children: [
      { path: '', component: AdminDashboardComponent }, // Default admin page
      { path: 'products', component: AdminProductListComponent }, // Add this line
      { path: 'products/new', component: AdminProductFormComponent }, // Add this line
      { path: 'products/edit/:id', component: AdminProductFormComponent }, // Add this line
      { path: 'orders', component: AdminOrderListComponent }, // Add this line
      { path: 'orders/:id', component: AdminOrderDetailComponent } // Add this line
    ]
  },
  // Catch-all or Not Found route - can be added later
  // { path: '**', component: PageNotFoundComponent },
];
