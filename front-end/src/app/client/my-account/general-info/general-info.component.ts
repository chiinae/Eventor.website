import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface User {
  _id?: string;
  ServiceID?: string;
  package_id?: string;
  username?: string;
  password?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  dob?: string;
  phone_number?: string;
  gender?: string;
  role?: string;
  Create_At?: string;
  avatar?: string;
  status?: string;
  total_expenditure?: number;
  membershipType?: string;
  eventsCreated?: number;
  eventsJoined?: number;
  membershipExpiry?: string;
}

interface EditMode {
  [key: string]: boolean;
}

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  user: User = {};
  editMode: EditMode = {
    username: false,
    dateOfBirth: false,
    phone: false
  };
  tempValues: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      this.user = {
        _id: userData._id,
        ServiceID: userData.ServiceID,
        package_id: userData.package_id,
        username: userData.username || '',
        password: userData.password || '',
        email: userData.email || '',
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        dob: userData.dob || '',
        phone_number: userData.phone_number?.$numberLong || '',
        gender: userData.gender || '',
        role: userData.role || '',
        Create_At: userData.Create_At || '',
        avatar: userData.avatar || '',
        status: userData.status || '',
        total_expenditure: userData.total_expenditure || 0,
        membershipType: userData.membershipType || '',
        eventsCreated: userData.eventsCreated || 0,
        eventsJoined: userData.eventsJoined || 0,
        membershipExpiry: userData.membershipExpiry || ''
      };
    }
  }

  toggleEdit(field: string): void {
    this.editMode[field] = !this.editMode[field];
    if (this.editMode[field]) {
      this.tempValues[field] = this.user[field as keyof User]?.toString() || '';
    }
  }

  saveField(field: string): void {
    if (!this.user._id) return;

    const updateData = {
      [field]: this.user[field as keyof User]
    };

    this.authService.updateUserInfo(this.user._id, updateData).subscribe({
      next: (response) => {
        this.editMode[field] = false;
        alert('Cập nhật thông tin thành công!');
      },
      error: (error) => {
        if (this.tempValues[field]) {
          this.user = {
            ...this.user,
            [field]: this.tempValues[field]
          };
        }
        alert('Có lỗi xảy ra khi cập nhật thông tin!');
      }
    });
  }

  cancelEdit(field: string): void {
    this.editMode[field] = false;
    if (this.tempValues[field]) {
      this.user = {
        ...this.user,
        [field]: this.tempValues[field]
      };
    }
  }

  navigateTo(route: string): void {
    this.router.navigate(['/my-account', route]);
  }

  logout(): void {
    this.authService.logout(); // Sẽ tự động chuyển về homepage
  }

  backToHome(): void {
    this.router.navigate(['/homepage']);
  }

  updateField(field: string, value: any): void {
    if (!this.user._id) return;

    const updateData = {
      [field]: value
    };

    this.authService.updateUserInfo(this.user._id, updateData).subscribe({
      next: (response) => {
        console.log('Cập nhật thành công:', response);
      },
      error: (error) => {
        console.error('Lỗi khi cập nhật:', error);
      }
    });
  }
}
