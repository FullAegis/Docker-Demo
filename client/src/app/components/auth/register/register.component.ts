import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule], // Add CommonModule and RouterModule
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router);
  registrationError: string | null = null;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required], // Added username as per UserRegister model
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: [''], // Optional
      lastName: ['']  // Optional
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValue = this.registerForm.value;
      // API expects passwordHash. Assuming it means the raw password for registration.
      // If hashing is done client-side (not recommended), implement that here.
      // Based on AuthController.cs, it expects UserRegisterFormDTO with Username, Email, Password, FirstName, LastName.
      // The DTO in C# has 'Password' not 'PasswordHash'. The BLL model `User` has `PasswordHash`.
      // The `ToBll()` mapper in `UserRegisterFormDTO` likely handles hashing or prepares it for hashing.
      // So, send the raw password as 'password'.
      // The `UserRegister` model in `auth.model.ts` should also reflect this.
      this.authService.register({
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
        firstName: formValue.firstName,
        lastName: formValue.lastName
      }).subscribe({
        next: () => {
          this.router.navigate(['/login']); // Navigate to login after successful registration
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.registrationError = err.error?.message || err.message || 'Registration failed. Please try again.';
           if (err.status === 400 && typeof err.error === 'string') {
            this.registrationError = err.error;
          } else if (err.error?.errors) {
            this.registrationError = Object.values(err.error.errors).flat().join(' ');
          }
        }
      });
    }
  }
}
