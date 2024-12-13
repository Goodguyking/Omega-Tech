import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-upload',
  templateUrl: './seller-upload.component.html',
  styleUrls: ['./seller-upload.component.scss']
})
export class SellerUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.uploadForm = this.fb.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$')]],
    });
  }

  // Handle file selection
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      console.log('Selected file:', this.selectedFile);  // Add this line
    }
  }

  // Handle form submission
  onSubmit(): void {
    console.log(this.uploadForm.value);  // Log form data before appending

    if (this.uploadForm.invalid || !this.selectedFile) {
      alert('Please fill all fields and select a photo.');
      return;
    }

    const userId = localStorage.getItem('userId');  // Get userId from localStorage
    if (!userId) {
      alert('You must be logged in to upload a product.');
      return;
    }

    const formData = new FormData();
    formData.append('productName', this.uploadForm.value.productName);
    formData.append('description', this.uploadForm.value.description);
    formData.append('price', this.uploadForm.value.price);
    formData.append('photo', this.selectedFile);
    formData.append('userID', userId);  // Append userID to form data

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.productService.uploadProduct(formData).subscribe({
      next: (response) => {
        alert('Product uploaded successfully!');
        this.uploadForm.reset();
        this.selectedFile = null;
      },
      error: (error) => {
        console.error('Error uploading product:', error);
        alert('Failed to upload product. Please try again.');
      },
    });
  }
}
