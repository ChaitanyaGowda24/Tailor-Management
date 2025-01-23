import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapComponent } from 'src/app/map/map.component'; // Import the MapComponent

@Component({
selector: 'app-tailor-profile',
templateUrl: './tailor-profile.component.html',
styleUrls: ['./tailor-profile.component.css'],
})
export class TailorProfileComponent implements OnInit {
@ViewChild(MapComponent) mapComponent!: MapComponent; // Reference to the MapComponent

profileForm: FormGroup;
isEditing = false;
initialLocation: [number, number] = [51.505, -0.09]; // Default location (London)
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

  // Handle location change from the map
  onLocationChanged(newLocation: [number, number]) {
    this.initialLocation = newLocation;
    console.log('New Location:', newLocation);
  }

  // Use the user's current location
  useMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          this.initialLocation = newLocation;
          this.mapComponent.updateLocation(newLocation); // Update the map location
          this.snackBar.open('Location updated!', 'Close', { duration: 2000 });
        },
        (error) => {
          console.error('Error getting location:', error);
          this.snackBar.open('Failed to get location!', 'Close', {
            duration: 2000,
          });
        }
      );
    } else {
      this.snackBar.open('Geolocation is not supported by this browser.', 'Close', {
        duration: 2000,
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
