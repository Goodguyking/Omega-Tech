import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Correct import for AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Handle form submission
  onRegister(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    this.authService.register(userData.email, userData.password, userData.name).subscribe(
      (response) => {
        // Success: navigate to login page
        console.log('User registered:', response);
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      (error) => {
        // Error: show message to the user
        console.error('Registration error:', error);
        alert(error.error?.message || 'Registration failed. Please try again.');
      }
    );
  }


  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
