import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Replace `any` with your Product interface
  isEditModalOpen = false;
  editForm: FormGroup;
  currentProduct: any;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Fetch all products
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        const userId = localStorage.getItem('userId'); // Get the logged-in user's ID from localStorage
        if (userId) {
          // Filter products to only show the ones that belong to the logged-in user
          this.products = response.products.filter(
            (product: any) => product.userID === parseInt(userId)
          );
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }

  // Handle delete product
  deleteProduct(productID: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productID).subscribe({
        next: () => {
          alert('Product deleted successfully!');
          this.fetchProducts(); // Refresh the product list
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product.');
        },
      });
    }
  }

  // Open the edit modal
  openEditModal(product: any): void {
    this.currentProduct = product;
    this.editForm.patchValue({
      productName: product.productName,
      description: product.description,
      price: product.price,
    });
    this.isEditModalOpen = true;
  }

  // Close the edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Handle update product
  updateProduct(): void {
    if (this.editForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const updatedProduct = {
      ...this.currentProduct,
      ...this.editForm.value,
    };

    this.productService.updateProduct(updatedProduct.productID, updatedProduct).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.closeEditModal();
        this.fetchProducts(); // Refresh product list
      },
      error: (error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
      },
    });
  }
}
