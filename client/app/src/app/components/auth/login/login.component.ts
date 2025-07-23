import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  loginError: string | null = null;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      // The API expects 'passwordHash' based on UserLogin model, but form has 'password'.
      // This needs clarification. Assuming API takes raw password for login.
      // If API AuthController.Login expects UserLoginFormDTO with Email and Password:
      const password = this.loginForm.value.password;
      this.authService.login({ email, password: password }).subscribe({
        next: () => {
          this.router.navigate(['/']); // Navigate to home or dashboard
        },
        error: (err) => {
          console.error('Login failed', err);
          this.loginError = err.error?.message || err.message || 'Invalid credentials or server error.';
          if (err.status === 400 && typeof err.error === 'string') { // Specific handling for string error response
            this.loginError = err.error;
          } else if (err.error?.errors) { // Handle validation errors from ModelState
            this.loginError = Object.values(err.error.errors).flat().join(' ');
          }
        }
      });
    }
  }
}
