import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: any; // Replace with your Product interface

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  // Getter for dynamically retrieving userId from localStorage
  get userId(): number | null {
    const id = localStorage.getItem('userId');
    console.log('Retrieved userId:', id); // Debugging log
    return id ? Number(id) : null; // Convert to number or return null if not set
  }

  ngOnInit(): void {
    // Retrieve the product ID from route params
    const productId = this.route.snapshot.params['id'];
    this.fetchProductDetails(productId);
  }

  // Fetch the product details by ID
  fetchProductDetails(productId: number): void {
    this.productService.getProductById(productId).subscribe({
      next: (response) => (this.product = response),
      error: (error) => console.error('Error fetching product details:', error),
    });
  }

  // Add to Cart functionality
  addToCart(): void {
    if (!this.product || this.userId === null) {
      alert('User not logged in or product details not found');
      return; // Ensure user is logged in and product exists
    }

    // Prepare the cart item object
    const cartItem = {
      userID: this.userId, // Match backend field names
      productID: this.product.productID, // Match backend field names
      quantity: 1, // Default quantity
    };

    console.log('Sending Cart Item to Backend:', cartItem); // Debugging log

    // Call the CartService to add to the cart
    this.cartService.addOrUpdateCartItem(cartItem).subscribe({
      next: (response) => {

        Swal.fire({
          title: 'Item Added to your cart!',
          text: 'Your order has been successfully placed in your cart.',
          icon: 'success',
          confirmButtonText: 'OK',
        })
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart.');
      },
    });
  }



  // Navigate back to home
 


}
