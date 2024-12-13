import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // Your backend API URL

  constructor(private http: HttpClient) {}

  // Register method
  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password, name });
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
    
  }

  updateUser(userId: number, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/auth/users/${userId}`, userData);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/users`);
  }

}
