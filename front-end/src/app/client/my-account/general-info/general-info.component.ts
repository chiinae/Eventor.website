import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User, ApiResponse } from '../../../interfaces/user.interface';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';

interface EditMode {
  [key: string]: boolean;
}

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  user!: User;
  editMode: EditMode = {
    name: false,
    email: false,
    phone_number: false,
    dob: false
  };
  
  hasChanges: boolean = false;
  error: string = '';
  originalValues: { [key: string]: any } = {};
  userForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Sử dụng AuthService để lấy thông tin user hiện tại
    this.authService.getCurrentUser().subscribe({
      next: (user: User | null) => {
        if (user && user._id) {
          // Nếu có user từ AuthService, gọi API để lấy thông tin mới nhất
          this.userService.getUserById(user._id).subscribe({
            next: (response: ApiResponse<User>) => {
              if (response.success && response.user) {
                this.user = response.user;
                // Cập nhật form với dữ liệu mới
                this.userForm.patchValue({
                  first_name: response.user.first_name,
                  last_name: response.user.last_name,
                  email: response.user.email,
                  phone_number: response.user.phone_number
                });
                this.saveOriginalValues();
                // Cập nhật lại localStorage và AuthService với dữ liệu mới
                this.authService.updateCurrentUser(response.user);
              } else {
                this.showError('Không thể tải thông tin người dùng');
                this.router.navigate(['/login']);
              }
            },
            error: (error: HttpErrorResponse) => {
              console.error('Lỗi khi lấy thông tin user:', error);
              this.showError('Lỗi khi tải thông tin: ' + (error.error?.message || error.message));
              if (error.status === 401 || error.status === 403) {
                this.authService.logout(); // Sử dụng logout của AuthService
              }
            }
          });
        } else {
          this.showError('Không tìm thấy thông tin người dùng');
          this.router.navigate(['/login']);
        }
      },
      error: (error: Error) => {
        console.error('Lỗi khi lấy thông tin user từ AuthService:', error);
        this.showError('Lỗi khi tải thông tin người dùng');
        this.router.navigate(['/login']);
      }
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
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
    if (!this.user) {
      this.snackBar.open('Không có thông tin người dùng', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

    const updatedData: Partial<User> = {};
    let hasChanges = false;

    // Kiểm tra từng trường và thêm vào updatedData nếu có thay đổi
    Object.keys(this.originalValues).forEach(key => {
      if (this.user[key as keyof User] !== this.originalValues[key]) {
        updatedData[key as keyof User] = this.user[key as keyof User] as any;
        hasChanges = true;
      }
    });

    if (!hasChanges) {
      this.snackBar.open('Không có thay đổi nào để lưu', 'Đóng', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['info-snackbar']
      });
      return;
    }

    console.log('Saving changes:', updatedData);
    this.userService.updateCurrentUser(updatedData).subscribe({
      next: (updatedUser) => {
        console.log('Update successful:', updatedUser);
        this.user = updatedUser;
        this.saveOriginalValues();
        this.hasChanges = false;
        Object.keys(this.editMode).forEach(key => this.editMode[key] = false);
        
        this.snackBar.open('Cập nhật thông tin thành công', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.error('Update failed:', error);
        let errorMessage = 'Lỗi khi cập nhật thông tin';
        
        if (error.status === 403) {
          errorMessage = 'Phiên đăng nhập đã hết hạn';
          this.router.navigate(['/login']);
        } else if (error.error?.message) {
          errorMessage = error.error.message;
        }

        this.snackBar.open(errorMessage, 'Đóng', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
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

  updateSingleField(field: string, value: any): void {
    if (this.user && this.user._id) {
      const updateData = { [field]: value };
      this.userService.updateUserById(this.user._id, updateData).subscribe({
        next: (response: ApiResponse<User>) => {
          if (response.success) {
            Object.assign(this.user, updateData);
            this.editMode[field] = false;
            this.snackBar.open('Cập nhật thông tin thành công', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          } else {
            this.error = response.message || 'Lỗi không xác định';
            this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        },
        error: (error: Error) => {
          this.error = `Không thể cập nhật ${field}: ` + (error.message || error);
          this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      });
    }
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

    const fieldMapping: { [key: string]: string } = {
      'phone_number': 'phone',
      'first_name': 'first_name',
      'last_name': 'last_name'
    };

    const serverField = fieldMapping[field] || field;
    const updateData = { [serverField]: this.user[field as keyof User] };
    console.log('Update data to send:', updateData);

    this.userService.updateUserById(this.user._id, updateData).subscribe({
      next: (response: ApiResponse<User>) => {
        console.log('Update response:', response);
        
        if (response.success && response.user) {
          console.log('Update successful');
          this.editMode[field] = false;
          this.error = '';
          
          const oldData = { ...this.user };
          this.user = { ...this.user, ...response.user };
          console.log('User data updated:', {
            old: oldData,
            new: this.user,
            changes: response.user
          });
          
          localStorage.setItem('user', JSON.stringify(this.user));
          console.log('LocalStorage updated');
          this.snackBar.open('Cập nhật thông tin thành công', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        } else {
          console.error('Update failed:', response.message);
          this.error = response.message || 'Lỗi không xác định';
          this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error in saveField:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        this.error = `Không thể cập nhật ${field}: ` + error.message;
        this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
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

  onSubmit(): void {
    if (this.userForm.valid && this.user && this.user._id) {
      const updateData = {
        ...this.userForm.value
      };
      this.userService.updateUserById(this.user._id, updateData).subscribe({
        next: (response: ApiResponse<User>) => {
          if (response.success) {
            Object.assign(this.user, updateData);
            this.snackBar.open('Cập nhật thông tin thành công', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          } else {
            this.error = response.message || 'Lỗi không xác định';
            this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open('Có lỗi xảy ra khi cập nhật thông tin', 'Đóng', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          console.error('Error updating user:', error);
        }
      });
    }
  }

  formatDate(date: string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }
}
