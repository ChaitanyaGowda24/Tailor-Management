import { Component, OnInit} from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User = {
      userId: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '********', // Masked for security
      role: 'User',
      phoneNumber: '+1234567890',
      createdAt: new Date('2023-01-01')
    };

    isEditMode: boolean = false;

    constructor() {}

    ngOnInit(): void {}

    toggleEditMode(): void {
      this.isEditMode = !this.isEditMode;
    }

    saveProfile(): void {
      // Add logic to save the updated profile (e.g., call an API)
      console.log('Profile saved:', this.user);
      this.isEditMode = false;
    }
}
