import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/components/change-password-dialog/change-password-dialog.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
selector: 'app-user-profile',
templateUrl: './user-profile.component.html',
styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
profileForm: FormGroup;
isEditing = false;
loggedInUser: User | null = null;

constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  address: ['', Validators.required],
  phoneNumber: ['', Validators.required],
   password: [''] // Add password field
});
  }

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  // Fetch user details from the backend
  fetchUserDetails(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUserById(+userId).subscribe(
        (user: User) => {
          this.loggedInUser = user;
          this.profileForm.patchValue({
            name: user.name,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
          });
        },
        (error) => {
          this.snackBar.open('Failed to fetch user details', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('User ID not found in localStorage', 'Close', {
        duration: 3000,
      });
    }
  }

  // Toggle edit mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        name: this.loggedInUser?.name,
        email: this.loggedInUser?.email,
        address: this.loggedInUser?.address,
        phoneNumber: this.loggedInUser?.phoneNumber,
      });
    }
  }

saveProfile(): void {
  if (this.profileForm.valid) {
    const userId = localStorage.getItem('id'); // Get user ID from localStorage
    if (!userId) {
      this.snackBar.open('User ID not found in localStorage', 'Close', {
        duration: 3000,
      });
      return;
    }

    // Create the updated user object
    const updatedUser: User = {
      id: +userId, // Use the userId from localStorage
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      address: this.profileForm.value.address,
      phoneNumber: this.profileForm.value.phoneNumber,
      password: this.profileForm.value.password || this.loggedInUser?.password || '', // Retain previous password if not edited
      role: this.loggedInUser?.role || 'CUSTOMER', // Default role if not set
      createdAt: this.loggedInUser?.createdAt || new Date(), // Default creation date if not set
    };

    console.log('Sending updated user data:', updatedUser); // Debugging
    console.log('User ID from localStorage:', userId); // Debugging

    // Call the updateUser method with the userId from localStorage
    this.userService.updateUser(+userId, updatedUser).subscribe(
      (user: User) => {
        this.loggedInUser = user;
        this.isEditing = false;
        this.snackBar.open('Profile updated successfully!', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error updating profile:', error); // Debugging
        this.snackBar.open('Failed to update profile', 'Close', {
          duration: 3000,
        });
      }
    );
  } else {
    this.snackBar.open('Form is invalid', 'Close', {
      duration: 3000,
    });
  }
}
}
