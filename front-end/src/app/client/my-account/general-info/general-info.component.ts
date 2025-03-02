import { Component } from '@angular/core';
import { InvoicesComponent } from '../invoices/invoices.component';
import { SavedEventsComponent } from '../saved-events/saved-events.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-info',
  standalone: true,
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {
  constructor(private router: Router) {}

  user = {
    avatarUrl: '../../../../assets/images/user-avatar.png',
    name: 'Nguyễn Minh Anh',
    registrationDate: '11/05/2025'
  };

  navigateTo(tab: string) {
    this.router.navigate(['/my-account', tab]); // Điều hướng đúng vào tab trong my-account
  }

  logout() {
    console.log('Đăng xuất...');
    // Thực hiện xử lý đăng xuất tại đây (xóa token, chuyển hướng...)
  }
}
