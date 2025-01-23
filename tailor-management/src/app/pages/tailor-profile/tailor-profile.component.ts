import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
selector: 'app-tailor-profile',
templateUrl: './tailor-profile.component.html',
styleUrls: ['./tailor-profile.component.css'],
})
export class TailorProfileComponent implements OnInit {
profileForm: FormGroup;
isEditing = false;
acceptedCategories = [
{ name: 'Shirts', price: 500 },
{ name: 'Pants', price: 700 },
{ name: 'Dresses', price: 1000 },
];

constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.profileForm = this.fb.group({
      name: ['John Doe', Validators.required],
      shopName: ['Fashion Tailors', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['123-456-7890', Validators.required],
      location: ['New York, USA', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.profileForm.reset({
        name: 'John Doe',
        shopName: 'Fashion Tailors',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        location: 'New York, USA',
      });
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.profileForm.valid) {
      this.isEditing = false;
      this.snackBar.open('Profile updated successfully!', 'Close', {
        duration: 3000,
      });
    }
  }

  // Update price for a category
  updatePrice(category: any, newPrice: number) {
    category.price = newPrice;
    this.snackBar.open(`Price updated for ${category.name}`, 'Close', {
      duration: 2000,
    });
  }
}
