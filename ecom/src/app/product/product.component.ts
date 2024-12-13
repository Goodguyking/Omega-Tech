import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  products: any[] = []; // Replace `any` with your Product interface

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        this.products = response.products; // Adjust based on API response structure
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  // Handle view details button
  viewDetails(product: any): void {
    alert(`Viewing details for: ${product.productName}`);
    // You can navigate to a detailed view page or open a modal
    // Example: this.router.navigate(['/product-details', product.productID]);
  }
}
