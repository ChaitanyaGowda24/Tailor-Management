import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MapComponent } from 'src/app/map/map.component'; // Import the MapComponent
import { TailorService } from '../../services/tailor.service'; // Import the TailorService
import { Tailor } from '../../models/tailor.model'; // Import the Tailor model

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css'],
})
export class TailorProfileComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent; // Reference to the MapComponent

  profileForm: FormGroup;
  isEditing = false;
  initialLocation: [number, number] = [0, 0]; // Initialize with default values
  acceptedCategories: { name: string; price: number }[] = []; // Initialize with empty array

  tailor: Tailor | null = null; // Tailor details

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private tailorService: TailorService // Inject TailorService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      shopName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchTailorDetails();
  }

  // Fetch tailor details using ID
  fetchTailorDetails() {
    const tailorId = localStorage.getItem('id'); // Get tailorId from local storage
    if (tailorId) {
      this.tailorService.getTailorById(+tailorId).subscribe(
        (response: Tailor) => {
          this.tailor = response; // Set the fetched tailor details
          this.updateFormWithTailorDetails(response); // Update the form with fetched details
          this.initialLocation = [response.location.latitude, response.location.longitude]; // Set initial location
          this.acceptedCategories = response.dress; // Set accepted categories from the dress array

          // Update the map location after fetching tailor details
          if (this.mapComponent) {
            this.mapComponent.updateLocation(this.initialLocation);
          }
        },
        (error) => {
          console.error('Failed to fetch tailor details', error);
          this.snackBar.open('Failed to fetch tailor details!', 'Close', {
            duration: 2000,
          });
        }
      );
    }
  }

  // Update the form with fetched tailor details
  updateFormWithTailorDetails(tailor: Tailor) {
    this.profileForm.patchValue({
      name: tailor.name,
      shopName: tailor.shopName,
      email: tailor.email,
      phone: tailor.phone,
    });
  }

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.updateFormWithTailorDetails(this.tailor!); // Reset form to fetched details
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.profileForm.valid) {
      const updatedDetails = {
        ...this.tailor,
        ...this.profileForm.value,
        location: {
          latitude: this.initialLocation[0],
          longitude: this.initialLocation[1],
        },
        dress: this.acceptedCategories, // Include updated dress prices
      };

      // Call the TailorService to update the tailor details
      this.tailorService.updateTailor(updatedDetails).subscribe(
        (response) => {
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
          });
          this.isEditing = false;
          this.tailor = response; // Update the local tailor details
        },
        (error) => {
          console.error('Failed to update tailor details', error);
          this.snackBar.open('Failed to update profile!', 'Close', {
            duration: 3000,
          });
        }
      );
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
