import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private apiUrl = 'http://localhost:3000/api/checkout'; // Backend URL for checkout items

  constructor(private http: HttpClient) {}

  // Fetch checkout items for a specific user
  getCheckoutItems(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
}
