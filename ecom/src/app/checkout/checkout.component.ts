import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutItems: any[] = [];
  userId: number | null = null;
  paginatedItems: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;  // Adjust the number of items per page
  totalPages: number = 1;

  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));

    if (this.userId) {
      this.fetchCheckoutItems(this.userId);
    } else {
      alert('User not logged in.');
    }
  }

  fetchCheckoutItems(userId: number): void {
    this.checkoutService.getCheckoutItems(userId).subscribe({
      next: (items) => {
        this.checkoutItems = items;
        this.totalPages = Math.ceil(this.checkoutItems.length / this.itemsPerPage);
        this.updatePaginatedItems();
      },
      error: (error) => {
        console.log('empty checkout items');
      },
    });
  }

  updatePaginatedItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.checkoutItems.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedItems();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedItems();
    }
  }

  // Calculate total price for each item (product price * quantity)
  calculateTotalPrice(item: any): number {
    return item.product.price * item.quantity;
  }
}
