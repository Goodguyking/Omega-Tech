import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  // Example data for contacts
  contacts = [
    { name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890' },
    { name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210' },
    { name: 'Alice Johnson', email: 'alicejohnson@example.com', phone: '555-555-5555' }
  ];

  deleteContact(contact: any): void {
    this.contacts = this.contacts.filter(c => c !== contact);
  }
}
