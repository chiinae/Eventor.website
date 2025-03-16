import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User, ApiResponse } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';

interface EditMode {
  [key: string]: boolean;
}

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  user: User = {
    _id: '',
    username: '',
    email: '',
    role: '',
    membershipType: 'standard',
    eventsJoined: [],
    eventsCreated: [],
    first_name: '',
    last_name: '',
    phone_number: '',
    gender: '',
    status: '',
    createdAt: new Date(),
    dob: new Date()
  };
  
  editMode: EditMode = {
    name: false,
    email: false,
    phone_number: false,
    dob: false
  };
  
  hasChanges: boolean = false;
  error: string = '';
  originalValues: { [key: string]: any } = {};

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = { ...this.user, ...JSON.parse(storedUser) };
      // Lưu lại giá trị ban đầu
      this.saveOriginalValues();
    }
  }

  saveOriginalValues(): void {
    this.originalValues = {
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      email: this.user.email,
      phone_number: this.user.phone_number,
      dob: this.user.dob
    };
  }

  toggleEdit(field: string): void {
    // Nếu đang edit field khác, không cho edit field mới
    if (this.hasChanges && !this.editMode[field]) {
      this.error = 'Vui lòng lưu hoặc hủy thay đổi hiện tại trước khi chỉnh sửa trường khác';
      return;
    }

    this.editMode[field] = !this.editMode[field];
    
    if (!this.editMode[field]) {
      // Khi tắt edit mode, kiểm tra xem có thay đổi không
      this.checkForChanges();
    }
  }

  checkForChanges(): void {
    const hasChanges = Object.keys(this.originalValues).some(key => {
      if (key === 'dob') {
        const originalDate = this.originalValues[key] ? new Date(this.originalValues[key]) : null;
        const currentDate = (this.user as any)[key] ? new Date((this.user as any)[key]) : null;
        
        if (!originalDate && !currentDate) return false;
        if (!originalDate || !currentDate) return true;
        
        return originalDate.getTime() !== currentDate.getTime();
      }
      return this.originalValues[key] !== (this.user as any)[key];
    });

    this.hasChanges = hasChanges;
  }

  saveAllChanges(): void {
    if (!this.user._id) {
      this.error = 'Không tìm thấy ID người dùng';
      return;
    }

    // Tạo object chứa các giá trị đã thay đổi
    const changedValues: { [key: string]: any } = {};
    Object.keys(this.originalValues).forEach(key => {
      const userValue = (this.user as any)[key];
      if (this.originalValues[key] !== userValue) {
        changedValues[key] = userValue;
      }
    });

    if (Object.keys(changedValues).length === 0) {
      this.error = 'Không có thay đổi nào để lưu';
      return;
    }

    this.userService.updateUser(this.user._id, changedValues).subscribe({
      next: (response: ApiResponse<User>) => {
        if (response.success && response.user) {
          // Cập nhật thông tin người dùng
          this.user = { ...this.user, ...response.user };
          // Cập nhật localStorage
          localStorage.setItem('user', JSON.stringify(this.user));
          // Reset các trạng thái
          this.hasChanges = false;
          this.error = '';
          Object.keys(this.editMode).forEach(key => {
            this.editMode[key] = false;
          });
          // Cập nhật lại giá trị gốc
          this.saveOriginalValues();
        } else {
          this.error = response.message || 'Lỗi không xác định khi lưu thông tin';
        }
      },
      error: (err) => {
        this.error = 'Không thể lưu thông tin người dùng: ' + (err.message || err);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
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

    this.userService.updateUser(this.user._id, updateData).subscribe({
      next: (response: ApiResponse<User>) => {
        if (response.success && response.user) {
          console.log('Cập nhật thành công:', response.user);
          // Cập nhật thông tin trong component
          this.user = { ...this.user, ...response.user };
          // Cập nhật localStorage
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          this.error = response.message || 'Lỗi không xác định';
        }
      },
      error: (error: any) => {
        console.error('Lỗi khi cập nhật:', error);
        this.error = error.message || 'Lỗi không xác định';
      }
    });
  }

  markAsChanged(): void {
    this.hasChanges = true;
  }

  checkChanges(): void {
    this.hasChanges = Object.keys(this.user).some(key => {
      return this.user[key as keyof User] !== this.originalValues[key]; 
    });
  }

  saveField(field: string): void {
    console.log('=== Start saveField ===');
    console.log('Field to update:', field);
    console.log('Current user data:', this.user);
    
    if (!this.user._id) {
      this.error = 'Không tìm thấy ID người dùng';
      console.error('No user ID found');
      return;
    }

    // Chuyển đổi tên trường để khớp với schema
    const fieldMapping: { [key: string]: string } = {
      'phone_number': 'phone',
      'first_name': 'first_name',
      'last_name': 'last_name'
    };

    const serverField = fieldMapping[field] || field;
    const updateData = { [serverField]: this.user[field as keyof User] };
    console.log('Update data to send:', updateData);

    this.userService.updateUser(this.user._id, updateData).subscribe({
      next: (response: ApiResponse<User>) => {
        console.log('Update response:', response);
        
        if (response.success && response.user) {
          console.log('Update successful');
          this.editMode[field] = false;
          this.error = '';
          
          // Cập nhật lại thông tin user
          const oldData = { ...this.user };
          this.user = { ...this.user, ...response.user };
          console.log('User data updated:', {
            old: oldData,
            new: this.user,
            changes: response.user
          });
          
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log('LocalStorage updated');
        } else {
          console.error('Update failed:', response.message);
          this.error = response.message || 'Lỗi không xác định';
        }
      },
      error: (error: any) => {
        console.error('Error in saveField:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message || error,
          error: error.error
        });
        this.error = `Không thể cập nhật ${field}: ` + (error.message || error);
      }
    });
  }

  cancelEdit(field: string): void {
    if (field === 'name') {
      if (this.originalValues['first_name'] !== undefined) {
        this.user.first_name = this.originalValues['first_name'];
      }
      if (this.originalValues['last_name'] !== undefined) {
        this.user.last_name = this.originalValues['last_name'];
      }
    } else if (this.originalValues[field] !== undefined) {
      (this.user as any)[field] = this.originalValues[field];
    }
    this.editMode[field] = false;
  }
}
