import { Component, AfterViewChecked } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service'; // Import the service
import { User, LoginRequest } from '../../models/user.model'; // Import the models
import * as L from 'leaflet';




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexComponent implements AfterViewChecked {
latitude: number | undefined;
longitude: number | undefined;
private map: L.Map | undefined;
private isMapInitialized = false;

// User registration and login models
  user: User = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  };

  loginRequest: LoginRequest = {
    email: '',
    password: '',
  };

constructor(private userService: UserService) {}

ngAfterViewChecked(): void {
    if (this.isTailorRegistrationPopupOpen && !this.isMapInitialized) {
      this.initMap();
      this.isMapInitialized = true;
    }
  }

isLoginPopupOpen = false;
isRoleSelectionPopupOpen = false;
isCustomerRegistrationPopupOpen = false;
isTailorRegistrationPopupOpen = false;

// For dynamic price inputs
showShirtsPrice = false;
showPantsPrice = false;
showKurtaPrice = false;
showPalazzaPantsPrice = false;
showSherwaniPrice = false;
showSuitsPrice = false;
showBlazersPrice = false;
showSalwaarKameezPrice = false;
showSkirtsPrice = false;
showLehengasPrice = false;
showAnarkaliSuitsPrice = false;
showTopsPrice = false;

openLoginPopup() {
    this.isLoginPopupOpen = true;
    setTimeout(() => this.initMap(), 0);
  }

  closeLoginPopup() {
    this.isLoginPopupOpen = false;
  }

  openRoleSelectionPopup() {
    this.isRoleSelectionPopupOpen = true;
  }

  closeRoleSelectionPopup() {
    this.isRoleSelectionPopupOpen = false;
  }

  openCustomerRegistrationPopup() {
    this.isCustomerRegistrationPopupOpen = true;
    this.isRoleSelectionPopupOpen = false;
  }

  closeCustomerRegistrationPopup() {
    this.isCustomerRegistrationPopupOpen = false;
  }

  openTailorRegistrationPopup() {
    this.isTailorRegistrationPopupOpen = true;
    this.isRoleSelectionPopupOpen = false;
  }

 closeTailorRegistrationPopup() {
    this.isTailorRegistrationPopupOpen = false;
    this.isMapInitialized = false; // Reset the map initialization flag

    // Destroy the map if it exists
    if (this.map) {
      this.map.remove(); // Remove the map instance
      this.map = undefined; // Reset the map variable
    }
  }

 // Handle customer registration
  onCustomerRegister() {
    this.userService.registerUser(this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.closeCustomerRegistrationPopup(); // Close the popup on success
        alert('Registration successful!'); // Show success message
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.'); // Show error message
      }
    );
  }

  // Handle user login
  onLogin() {
    this.userService.loginUser(this.loginRequest).subscribe(
      (response) => {
        console.log('Login successful', response);
        alert('Login successful!'); // Show success message
        // Optionally, navigate to another page
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please check your credentials.'); // Show error message
      }
    );
  }

  togglePriceInput(dressType: string) {
    switch (dressType) {
      case 'shirts':
        this.showShirtsPrice = !this.showShirtsPrice;
        break;
      case 'pants':
        this.showPantsPrice = !this.showPantsPrice;
        break;
      case 'kurta':
        this.showKurtaPrice = !this.showKurtaPrice;
        break;
      case 'palazzaPants':
        this.showPalazzaPantsPrice = !this.showPalazzaPantsPrice;
        break;
      case 'sherwani':
        this.showSherwaniPrice = !this.showSherwaniPrice;
        break;
      case 'suits':
        this.showSuitsPrice = !this.showSuitsPrice;
        break;
      case 'blazers':
        this.showBlazersPrice = !this.showBlazersPrice;
        break;
      case 'salwaarKameez':
        this.showSalwaarKameezPrice = !this.showSalwaarKameezPrice;
        break;
      case 'skirts':
        this.showSkirtsPrice = !this.showSkirtsPrice;
        break;
      case 'lehengas':
        this.showLehengasPrice = !this.showLehengasPrice;
        break;
      case 'anarkaliSuits':
        this.showAnarkaliSuitsPrice = !this.showAnarkaliSuitsPrice;
        break;
      case 'tops':
        this.showTopsPrice = !this.showTopsPrice;
        break;
    }
  }
  private initMap(): void {
  // Initialize the map with a default view (in case geolocation fails)
  this.map = L.map('tailorMap').setView([51.505, -0.09], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(this.map);

  // Fix for default marker icon path
  const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  L.Marker.prototype.options.icon = defaultIcon;

  let marker: L.Marker | null = null; // Variable to store the marker

  // Request the user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Set the map view to the user's location
        this.map?.setView([latitude, longitude], 13);

        // Add a marker at the user's location
        marker = L.marker([latitude, longitude]).addTo(this.map!);

        // Optional: Add a popup to the marker
        marker.bindPopup('Your current location').openPopup();

        // Update the form fields with the user's location
        this.latitude = latitude;
        this.longitude = longitude;
      },
      (error) => {
        console.error('Error getting user location:', error);
        alert('Unable to retrieve your location. Using default location.');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by your browser. Using default location.');
  }

  // Handle map clicks to update the marker and form fields
  this.map.on('click', (e: L.LeafletMouseEvent) => {
    this.latitude = e.latlng.lat;
    this.longitude = e.latlng.lng;

    // Remove the existing marker (if any)
    if (marker) {
      this.map?.removeLayer(marker);
    }

    // Add a new marker at the clicked location
    marker = L.marker([this.latitude, this.longitude]).addTo(this.map!);

    // Optional: Add a popup to the marker
    marker.bindPopup(`Selected Location: ${this.latitude}, ${this.longitude}`).openPopup();
  });
}


  useMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Set the map view to the user's location
        this.map?.setView([latitude, longitude], 13);

        // Add a marker at the user's location
        const marker = L.marker([latitude, longitude]).addTo(this.map!);

        // Optional: Add a popup to the marker
        marker.bindPopup('Your current location').openPopup();

        // Update the form fields with the user's location
        this.latitude = latitude;
        this.longitude = longitude;
      },
      (error) => {
        console.error('Error getting user location:', error);
        alert('Unable to retrieve your location.');
      }
    );
  } else {
    console.error('Geolocation is not supported by this browser.');
    alert('Geolocation is not supported by your browser.');
  }
}
}



