import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showErrorPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.errorMessage = 'Vui lòng nhập đầy đủ email và mật khẩu';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe({
      next: () => {
        console.log('Login successful');
        this.isLoading = false;
        // this.snackBar.open('Đăng nhập thành công', 'Đóng', {
        //   duration: 3000,
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        // });
        setTimeout(() => {
          this.router.navigate(['/homepage']).then(() => {
            window.location.reload();
          });
        }, 1000);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        if (error.status === 401) {
          this.errorMessage = 'Email hoặc mật khẩu không đúng';
          this.showErrorPopup = true;
        } else if (error.status === 0) {
          this.errorMessage = 'Không thể kết nối đến server';
          this.showErrorPopup = true;
        } else {
          this.errorMessage = error.message || 'Đã có lỗi xảy ra khi đăng nhập';
          this.showErrorPopup = true;
        }

        // this.snackBar.open(this.errorMessage, 'Đóng', {
        //   horizontalPosition: 'right',
        //   verticalPosition: 'top',
        //   panelClass: ['error-snackbar']
        // });
      }
    });
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
  
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToHomepage() {
    this.router.navigate(['/homepage']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']); // Chuyển hướng đến trang quên mật khẩu
  }

}
