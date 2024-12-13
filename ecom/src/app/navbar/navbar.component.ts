import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private router: Router) {}

  onLogout(): void {
    // Clear any session or token data
    localStorage.removeItem('token'); // Adjust key based on your storage strategy
    sessionStorage.clear();

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
