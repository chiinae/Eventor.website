import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../interfaces/user.interface';

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
    first_name: false,
    last_name: false,
    dob: false,
    phone_number: false
  };
  tempValues: { [key: string]: string } = {};
  hasChanges: boolean = false;
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

    const updateData = { [field]: this.user[field as keyof User] };

    this.authService.updateUserInfo(this.user._id, updateData).subscribe({
      next: () => {
        this.editMode[field] = false;
        this.hasChanges = true; // Đánh dấu có thay đổi
        alert('Cập nhật thành công!');
      },
      error: () => {
        if (this.tempValues[field]) {
          this.user[field as keyof User] = this.tempValues[field] as any; 
        }
        alert('Có lỗi xảy ra khi cập nhật!');
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

  saveAllChanges(): void {
    if (!this.hasChanges) return; // Chỉ lưu khi có thay đổi

    const fieldsToUpdate = Object.keys(this.editMode).filter(field => this.editMode[field]);

    fieldsToUpdate.forEach(field => this.saveField(field));
    this.hasChanges = false;
  }

  markAsChanged(): void {
    this.hasChanges = true;
  }

  checkChanges(): void {
    this.hasChanges = Object.keys(this.user).some(key => {
      return this.user[key as keyof User] !== this.tempValues[key]; 
    });
  }

  backToHome(): void {
    this.router.navigate(['/homepage']);
  }
}
