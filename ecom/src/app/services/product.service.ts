import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/products'; // Update with your backend API base URL

  constructor(private http: HttpClient) {}

  // Upload product
  uploadProduct(data: FormData): Observable<any> {
    console.log('Form Data:', FormData);

    return this.http.post(`${this.baseUrl}`, data);
  }
  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  getProductsByUserID(userID: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?userID=${userID}`);
  }
  // Delete a product by ID
  deleteProduct(productID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${productID}`);
  }
  updateProduct(productID: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${productID}`, product);
  }
  getProductById(productID: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productID}`);
  }
  
}
