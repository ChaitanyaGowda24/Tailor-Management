import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from 'src/app/components/change-password-dialog/change-password-dialog.component';

@Component({
selector: 'app-user-profile',
templateUrl: './user-profile.component.html',
styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
profileForm: FormGroup;
isEditing = false;

// Mock logged-in user data
loggedInUser = {
name: 'Jane Smith',
email: 'jane.smith@example.com',
phone: '987-654-3210',
profilePicture: 'assets/default-profile.png', // Default profile picture
};

constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      name: [this.loggedInUser.name, Validators.required],
      email: [this.loggedInUser.email, [Validators.required, Validators.email]],
      phone: [this.loggedInUser.phone, Validators.required],
    });
  }

  ngOnInit(): void {}

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        name: this.loggedInUser.name,
        email: this.loggedInUser.email,
        phone: this.loggedInUser.phone,
      });
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.profileForm.valid) {
      this.loggedInUser.name = this.profileForm.value.name;
      this.loggedInUser.email = this.profileForm.value.email;
      this.loggedInUser.phone = this.profileForm.value.phone;
      this.isEditing = false;
      this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  // Open change password dialog
  openChangePasswordDialog() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Password changed successfully:', result);
        this.snackBar.open('Password changed successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
