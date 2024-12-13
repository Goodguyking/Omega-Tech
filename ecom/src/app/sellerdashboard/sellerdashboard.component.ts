import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-sellerdashboard',
  templateUrl: './sellerdashboard.component.html',
  styleUrls: ['./sellerdashboard.component.css']
})
export class SellerdashboardComponent {

  constructor(private router: Router) {}

  // Implement the logout method
  logout(): void {
    // Clear the user-related items from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
