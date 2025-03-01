import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [LoginComponent, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  phoneNumber: string = ''; 
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    // Xử lý đăng ký ở đây
    console.log('Đăng ký với:', this.phoneNumber, this.password);
  }
}
