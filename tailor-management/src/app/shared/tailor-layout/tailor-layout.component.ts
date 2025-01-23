import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
selector: 'app-tailor-layout',
templateUrl: './tailor-layout.component.html',
styleUrls: ['./tailor-layout.component.css'],
})
export class TailorLayoutComponent implements AfterViewInit {
@ViewChild('sidenav') sidenav!: MatSidenav;
isProfileDropdownOpen = false; // Controls profile dropdown visibility

// Mock logged-in user data
loggedInUser = {
name: 'John Doe',
shopName: 'Fashion Tailors',
};

ngAfterViewInit() {
    // Close the sidenav initially
    this.sidenav.close();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  logout() {
    console.log('User logged out');
    // Add logout logic here (e.g., clear session, navigate to login page)
  }
}
