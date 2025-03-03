  import { Component } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { HomepageComponent } from '../homepage/homepage.component';

  @Component({
    selector: 'app-login',
    imports: [FormsModule,HomepageComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })
  export class LoginComponent {
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
