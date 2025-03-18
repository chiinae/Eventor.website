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
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Đăng nhập thất bại';
            this.showErrorPopup = true;
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Login error:', error);
          this.errorMessage = error.error.message || 'Đã xảy ra lỗi khi đăng nhập';
          this.showErrorPopup = true;
        }
      });
    }
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
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

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
}
