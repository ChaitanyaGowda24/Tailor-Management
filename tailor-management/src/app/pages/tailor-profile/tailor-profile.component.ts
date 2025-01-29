import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from 'src/app/map/map.component';
import { TailorService } from '../../services/tailor.service';
import { Tailor, Dress } from '../../models/tailor.model';
import { CategoryPopupComponent } from 'src/app/components/category-popup/category-popup.component';

@Component({
  selector: 'app-tailor-profile',
  templateUrl: './tailor-profile.component.html',
  styleUrls: ['./tailor-profile.component.css'],
})
export class TailorProfileComponent implements OnInit {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  profileForm: FormGroup;
  isEditing = false;
  initialLocation: [number, number] = [0, 0];
  acceptedCategories: Dress[] = [];
  tailor: Tailor | null = null;

  // List of all available categories
  allCategories: string[] = [
    'Suits',
    'Ethnic Suit',
    'Trousers',
    'Formal Shirts',
    'Pathani Suit',
    'Desi Jacket',
    'Blouse',
    'Kurti',
    'Anarkali Suit',
    'Punjabi Suit',
    'Chudidar Suit',
    'Lehenga',
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private tailorService: TailorService,
    private dialog: MatDialog
  ) {
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }, Validators.required],
      shopName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }, Validators.required],
      shopStatus: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchTailorDetails();
  }

  // Fetch tailor details using ID
  fetchTailorDetails() {
    const tailorId = localStorage.getItem('id');
    if (tailorId) {
      this.tailorService.getTailorById(+tailorId).subscribe(
        (response: Tailor) => {
          this.tailor = response;
          this.updateFormWithTailorDetails(response);
          this.initialLocation = [response.location.latitude, response.location.longitude];
          this.acceptedCategories = response.dress;

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
      shopStatus: tailor.status || 'OPEN',
    });
  }

  // Toggle edit mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.toggleFormControls(this.isEditing);
    if (!this.isEditing) {
      this.updateFormWithTailorDetails(this.tailor!); // Reset form to fetched details
    }
  }

  // Enable or disable form controls
  toggleFormControls(isEnabled: boolean) {
    if (isEnabled) {
      this.profileForm.get('name')?.enable();
      this.profileForm.get('shopName')?.enable();
      this.profileForm.get('email')?.enable();
      this.profileForm.get('phone')?.enable();
      this.profileForm.get('shopStatus')?.enable();
    } else {
      this.profileForm.get('name')?.disable();
      this.profileForm.get('shopName')?.disable();
      this.profileForm.get('email')?.disable();
      this.profileForm.get('phone')?.disable();
      this.profileForm.get('shopStatus')?.disable();
    }
  }

  // Save profile changes
  saveProfile() {
    if (this.profileForm.valid && this.tailor) {
      const updatedDetails = {
        ...this.tailor,
        ...this.profileForm.value,
        location: {
          latitude: this.initialLocation[0],
          longitude: this.initialLocation[1],
        },
        dress: this.acceptedCategories,
        status: this.profileForm.value.shopStatus,
      };

      this.tailorService.updateTailor(updatedDetails).subscribe(
        (response) => {
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
          });
          this.isEditing = false;
          this.toggleFormControls(false); // Disable form after saving
          this.tailor = response;
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

  // Open the category selection popup
  openCategoryPopup() {
    const dialogRef = this.dialog.open(CategoryPopupComponent, {
      width: '400px',
      data: {
        allCategories: this.allCategories,
        acceptedCategories: this.acceptedCategories.map((cat) => cat.name),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.acceptedCategories = result.selectedCategories.map((name: string) => {
          const existingCategory = this.acceptedCategories.find((cat) => cat.name === name);
          return existingCategory || { name, price: 0 };
        });
      }
    });
  }

  // Handle location change from the map
  onLocationChanged(newLocation: [number, number]) {
    this.initialLocation = newLocation;
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
          this.mapComponent.updateLocation(newLocation);
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
  updatePrice(category: Dress, newPrice: number) {
    category.price = newPrice;
    this.snackBar.open(`Price updated for ${category.name}`, 'Close', {
      duration: 2000,
    });
  }
}
