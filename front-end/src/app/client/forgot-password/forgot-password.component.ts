import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  phoneNumber: string = '';
  otpCode: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';

  constructor(private router: Router) {}

  sendVerificationCode() {
    alert('Mã xác thực đã được gửi!');
  }

  onSubmit() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    alert('Mật khẩu đã được đặt lại thành công!');
    this.router.navigate(['/login']);
  }

  loginWith(provider: string) {
    alert(`Đăng nhập với ${provider}`);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
