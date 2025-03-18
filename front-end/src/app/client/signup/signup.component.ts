import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit() {
    console.log('Form Valid:', this.signupForm.valid);
    console.log('Form Value:', this.signupForm.value);
    console.log('isLoading:', this.isLoading);
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Đăng ký thành công:', response);
          this.isLoading = false;
          this.navigateToLogin();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Đăng ký thất bại';
          this.isLoading = false;
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }
}
