import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Import SweetAlert

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  userId: number | null = null;
  allSelected: boolean = false;
  selectedPaymentMethod: string | null = null;
  
  // Add these properties to handle address, contact person, and phone number
  address: string = '';
  contactPerson: string = '';
  phoneNumber: string = '';
  showCheckoutModal: any;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.fetchCartItems(this.userId);
    } else {
      alert('User not logged in.');
    }
  }

  fetchCartItems(userId: number): void {
    this.cartService.getCartItems(userId).subscribe({
      next: (items) => {
        this.cartItems = items.map((item: any) => ({ ...item, selected: false }));
        this.updateAllSelectedStatus();
      },
      error: (error) => console.error('Error fetching cart items:', error),
    });
  }

  removeCartItem(cartId: number): void {
    this.cartService.deleteCartItem(cartId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter((item) => item.cartID !== cartId);

        Swal.fire({
          title: 'Successfully Removed',
          text: 'Item Removed from cart',
          icon: 'success',
          confirmButtonText: 'OK',
        })
        
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
        alert('Failed to remove item from cart.');
      },
    });
  }

  checkAll(event: any): void {
    const isChecked = event.target.checked;
    this.cartItems.forEach((item) => (item.selected = isChecked));
    this.updateAllSelectedStatus();
  }

  updateAllSelectedStatus(): void {
    this.allSelected = this.cartItems.every((item) => item.selected);
  }

  confirmCheckout(): void {
    const selectedItems = this.cartItems.filter(item => item.selected).map(item => item.cartID);
  
    if (selectedItems.length === 0) {
      alert('No items selected for checkout.');
      return;
    }
  
    // Include selected payment method and address details
    if (!this.selectedPaymentMethod) {
      alert('Payment method is required.');
      return;
    }
    if (!this.address || !this.contactPerson || !this.phoneNumber) {
      alert('Please provide all required contact details.');
      return;
    }
  
    const payload = {
      items: selectedItems,
      paymentMethod: this.selectedPaymentMethod,
      address: this.address,
      contactPerson: this.contactPerson,
      phoneNumber: this.phoneNumber,
    };
  
    this.cartService.checkoutItems(payload).subscribe({
      next: () => {
        // SweetAlert after successful checkout
        Swal.fire({
          title: 'Thank you for your purchase!',
          text: 'Your order has been successfully placed.',
          icon: 'success',
          confirmButtonText: 'OK',
          
        }).then(() => {
          this.fetchCartItems(this.userId!); // Refresh cart after checkout
          window.location.reload();
        });selectedItems
      },
      error: (error) => {
        console.error('Error during checkout:', error);
        alert('Checkout failed.');
      },
    });
  }

  // Calculate the total price of selected items
  calculateTotal(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Calculate VAT (5%)
  calculateVAT(): number {
    return this.calculateTotal() * 0.05;
  }

  // Calculate Delivery Fee (fixed amount of $3.5)
  calculateDeliveryFee(): number {
    return 3.5;
  }

  // Calculate the final total with VAT and Delivery Fee
  calculateFinalTotal(): number {
    return this.calculateTotal() + this.calculateVAT() + this.calculateDeliveryFee();
  }

  isSelected(): boolean {
    return this.cartItems.some((item) => item.selected);
  }

  // Decrease the quantity by 1
  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }

  // Increase the quantity by 1
  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateQuantity(item);
  }

  // Update the quantity in the backend
  updateQuantity(item: any): void {
    this.cartService.updateCartItem(item.cartID, item.quantity).subscribe({
      next: () => {
        console.log('Cart item updated');
      },
      error: (error) => {
        console.error('Error updating cart item:', error);
        alert('Failed to update cart item.');
      },
    });
  }

  // Toggle the checkout modal visibility
  toggleCheckoutModal(): void {
    this.showCheckoutModal = !this.showCheckoutModal;
  }
}
