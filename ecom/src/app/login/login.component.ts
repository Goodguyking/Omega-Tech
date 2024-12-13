import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        // Assuming the backend sends a response with the user role
        const user = response.user;

        // Store user details in localStorage
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.userID); // Store the user's id
        localStorage.setItem('userName', user.name); // Store the user's name

        // Navigate based on the user role
        if (user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else if (user.role === 'seller') {
          this.router.navigate(['/seller-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
        console.log(localStorage.getItem('userId'));

      },
      (error) => {
        // Handle login error
        this.errorMessage = 'Invalid email or password';
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
