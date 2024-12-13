import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart/';

  constructor(private http: HttpClient) {}

  // Method to add an item to the cart
  addOrUpdateCartItem(cartItem: { userID: number; productID: number; quantity: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, cartItem);
  }

  getCartItems(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${userId}`);
    
  }



  deleteCartItem(cartId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${cartId}`);
  }

  // checkoutItems(payload: { items: number[] }): Observable<any> {
  //   return this.http.post<any>(`${this.apiUrl}/checkout`, payload);
  // }

  checkoutItems(payload: { items: { cartID: number; quantity: number }[]; paymentMethod: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}checkout`, payload);
  }
  
  






  updateCartItem(cartId: number, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${cartId}`, { quantity });
  }


  // Check if product exists in cart
checkIfProductInCart(userID: number, productID: number): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}check`, { userID, productID });
}

// Add or update cart item
addToCart(cartItem: any): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}`, cartItem);
}

// Update cart item quantity
updateCartItemQuantity(cartID: number, quantity: number): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}${cartID}`, { quantity });
}



getCheckoutItems(userId: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/checkout/${userId}`);
}


}
