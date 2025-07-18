import { Component, OnInit } from '@angular/core'; // Added OnInit
import { CommonModule } from '@angular/common';
// Import UserService if you plan to use it, and other necessary modules
// import { UserService } from '../../../services/user/user.service'; // Correct path needed
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule /*, ReactiveFormsModule */], // Add ReactiveFormsModule if forms are used
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit { // Added OnInit
  // Example properties if building a form
  // profileForm: FormGroup;
  // isLoading = false;
  // error: string | null = null;
  // successMessage: string | null = null;

  constructor(
    // private userService: UserService, // Example injection
    // private fb: FormBuilder // Example injection
  ) {
    // Initialize form if using ReactiveFormsModule
    // this.profileForm = this.fb.group({
    //   email: [{value: '', disabled: true}, Validators.required],
    //   username: ['', Validators.required],
    //   firstName: [''],
    //   lastName: ['']
    // });
  }

  ngOnInit(): void { // Added ngOnInit
    // Load user profile data here if implementing fully
    // this.loadProfile();
  }

  // loadProfile(): void {
  //   this.isLoading = true;
  //   this.userService.getProfile().subscribe({
  //     next: (profile) => {
  //       if (profile) {
  //         this.profileForm.patchValue(profile);
  //       }
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.error = 'Failed to load profile.';
  //       this.isLoading = false;
  //     }
  //   });
  // }

  // onSubmit(): void {
  //   if (this.profileForm.invalid) {
  //     return;
  //   }
  //   this.isLoading = true;
  //   this.userService.updateProfile(this.profileForm.getRawValue()).subscribe({ // Use getRawValue for disabled fields
  //     next: () => {
  //       this.successMessage = 'Profile updated successfully!';
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       this.error = 'Failed to update profile.';
  //       this.isLoading = false;
  //     }
  //   });
  // }
}
