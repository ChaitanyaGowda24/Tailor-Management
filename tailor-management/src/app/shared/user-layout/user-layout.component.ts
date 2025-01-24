import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
selector: 'app-user-layout',
templateUrl: './user-layout.component.html',
styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements AfterViewInit {
@ViewChild('sidenav') sidenav!: MatSidenav;
isProfileDropdownOpen = false; // Controls profile dropdown visibility
isNotificationDropdownOpen = false; // Controls notification dropdown visibility

// Mock logged-in user data
loggedInUser = {
name: 'Jane Smith',
};

// Mock notifications
notifications = [
{ id: 1, message: 'Your order #123 is ready for pickup.', read: false },
{ id: 2, message: 'Your order #456 is out for delivery.', read: false },
];

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
    this.isNotificationDropdownOpen = false; // Close notification dropdown
  }

  toggleNotificationDropdown() {
    this.isNotificationDropdownOpen = !this.isNotificationDropdownOpen;
    this.isProfileDropdownOpen = false; // Close profile dropdown
  }

  markAllAsRead() {
    this.notifications.forEach((notification) => (notification.read = true));
    this.isNotificationDropdownOpen = false; // Close notification dropdown
  }

  logout() {
    console.log('User logged out');
    // Add logout logic here (e.g., clear session, navigate to login page)
  }
// Add this to the UserLayoutComponent class
get unreadNotificationsCount(): number {
  return this.notifications.filter((notification) => !notification.read).length;
}
}
