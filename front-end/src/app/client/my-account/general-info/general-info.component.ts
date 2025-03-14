import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, UserStats } from '../../../interfaces/user.interface';

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
  user: User = {
    _id: '',
    ServiceID: '',
    package_id: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    dob: new Date(),
    phone_number: '',
    gender: '',
    role: '',
    Create_At: new Date(),
    avatar: '',
    status: '',
    total_expenditure: 0
  };
  editMode: EditMode = {
    username: false,
    dateOfBirth: false,
    phone_number: false
  };
  hasChanges: boolean = false;
  userStats: UserStats | null = null;
  loading = true;
  tempValues: { [key: string]: string } = {};
  error: string = '';

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

  toggleEditMode(field: string): void {
    if (field === 'all') {
      // Nếu là 'all', reset tất cả các trường về false
      Object.keys(this.editMode).forEach(key => {
        this.editMode[key] = false;
      });
    } else {
      this.editMode[field] = !this.editMode[field];
    }
  }

  toggleEdit(field: string): void {
    this.toggleEditMode(field);
  }

  saveUserData(): void {
    if (this.user) {
      console.log('Saving user data:', this.user);
      // Kiểm tra nếu user._id tồn tại trước khi gọi API
      if (!this.user._id) {
        this.error = 'Không tìm thấy ID người dùng';
        console.log('User ID not found');
        return;
      }
      this.authService.updateUserInfo(this.user._id, this.user).subscribe({
        next: (updatedUser) => {
          this.error = '';
          console.log('User data saved successfully', updatedUser);
          // Cập nhật lại thông tin người dùng từ response
          this.user = updatedUser;
          // Reset tất cả các trường về chế độ xem
          this.toggleEditMode('all');
        },
        error: (err) => {
          this.error = 'Không thể lưu thông tin người dùng: ' + (err.message || err);
          console.log('Error saving user data:', err);
        }
      });
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

  saveAllChanges(): void {
    this.saveUserData();
  }

  markAsChanged(): void {
    this.hasChanges = true;
  }

  checkChanges(): void {
    this.hasChanges = Object.keys(this.user).some(key => {
      return this.user[key as keyof User] !== this.tempValues[key]; 
    });
  }
}
