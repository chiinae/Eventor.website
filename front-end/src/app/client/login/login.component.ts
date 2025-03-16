  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { HomepageComponent } from '../homepage/homepage.component';

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
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.success) {
            this.router.navigate(['/']);
          } else {
            this.errorMessage = 'Đăng nhập thất bại';
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = error.message || 'Đã xảy ra lỗi khi đăng nhập';
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

    constructor(private router: Router) {}

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
