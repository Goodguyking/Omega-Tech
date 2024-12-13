import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure for the registration form data
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Define the API URL (replace with the correct URL for your backend)
  private apiUrl = 'http://localhost:3000/users'; // Adjusted the URL

  constructor(private http: HttpClient) {}

  // Method to send a POST request to register a new user
  // registerUser(data: RegisterData): Observable<any> {
  //   return this.http.post(this.apiUrl, data); // Now POSTs to /users
  // }
}
