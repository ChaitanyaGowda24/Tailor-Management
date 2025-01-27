// src/app/layouts/user-layout/user-layout.component.ts

import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service'; // Import NotificationService
import { Notification } from '../../models/notification.model'; // Import Notification model

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css'],
})
export class UserLayoutComponent implements AfterViewInit, OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isProfileDropdownOpen = false; // Controls profile dropdown visibility
  isNotificationDropdownOpen = false; // Controls notification dropdown visibility

  // User details
  user: User | null = null;

  // Notifications
  notifications: Notification[] = [];

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    // Fetch user details when the component initializes
    this.fetchUserDetails();
    // Fetch unread notifications
    this.fetchUnreadNotifications();
  }

  ngAfterViewInit() {
    // Close the sidenav initially
    this.sidenav.close();
  }

  // Fetch user details
  fetchUserDetails() {
    const userId = localStorage.getItem('id'); // Get userId from local storage
    if (userId) {
      this.userService.getUserDetailsById(+userId).subscribe(
        (response: User) => {
          this.user = response; // Set the fetched user details
          console.log('Fetched user data:', response);
        },
        (error) => {
          console.error('Failed to fetch user details', error);
        }
      );
    }
  }

  // Fetch unread notifications
  fetchUnreadNotifications() {
    const userId = localStorage.getItem('id'); // Get userId from local storage
    if (userId) {
      this.notificationService.getUnreadNotifications(+userId).subscribe(
        (response: Notification[]) => {
          this.notifications = response; // Set the fetched notifications
          console.log('Fetched notifications:', response);
        },
        (error) => {
          console.error('Failed to fetch notifications', error);
        }
      );
    }
  }

 markAllAsRead() {
   const userId = localStorage.getItem('id'); // Get userId from local storage
   if (userId) {
     // Iterate through each notification and mark it as read
     this.notifications.forEach((notification) => {
       this.notificationService.markNotificationAsRead(notification.id).subscribe(
         (response: string) => {
           console.log(response); // Log success for each notification
         },
         (error) => {
           console.error('Failed to mark notification as read', error);
         }
       );
     });

     this.notifications = []; // Clear the notifications list
     this.isNotificationDropdownOpen = false; // Close the dropdown
   }
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

  logout() {
    console.log('User logged out');
    // Clear session data
    localStorage.removeItem('authToken'); // Clear the token
    localStorage.removeItem('id'); // Clear the user ID
    // Navigate to the login page
    this.router.navigate(['/']);
  }

  // Get the count of unread notifications
  get unreadNotificationsCount(): number {
    return this.notifications.length;
  }
}
