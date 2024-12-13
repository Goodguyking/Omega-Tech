import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  users: any[] = []; // Array to store fetched users
  editForm: FormGroup;
  currentUser: any;

  constructor(private authservice: AuthService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      userID: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users when the component loads
  }

  // Fetch all users
  fetchUsers(): void {
    this.authservice.getAllUsers().subscribe({
      next: (response: any) => {
        this.users = response.users;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    });
  }

  // Open the edit modal or populate the form for the selected user
  openEditForm(user: any): void {
    this.currentUser = user;
    this.editForm.patchValue({
      userID: user.userID,
      name: user.name,
      email: user.email,
      password: user.password, // You may want to hash the password before submitting
      role: user.role,
    });
  }

  // Handle update user
  updateUser(): void {
    if (this.editForm.invalid) {
      alert('Please fill out all fields correctly.');
      return;
    }

    const updatedUser = this.editForm.value;

    this.authservice.updateUser(updatedUser.userID, updatedUser).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.fetchUsers(); // Refresh the user list
      },
      error: (error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      },
    });
  }
}
