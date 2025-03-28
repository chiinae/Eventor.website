import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  // Danh sách menu sidebar
  menuItems = [
    { path: '/admin-homepage/manageoverall', label: 'Trang chủ', icon: 'assets/images/icon-admin-homepage/event-category.png' },
    { path: '/admin-homepage/accountmanage', label: 'Quản lý tài khoản', icon: 'assets/images/icon-admin-homepage/account.png' },
    { path: '/admin-homepage/eventmanage', label: 'Quản lý sự kiện', icon: 'assets/images/icon-admin-homepage/event.png' },
    { path: '/admin-homepage/contentmanage', label: 'Quản lý nội dung', icon: 'assets/images/icon-admin-homepage/content.png' },
    { path: '/admin-homepage/paymentmanage', label: 'Quản lý thanh toán', icon: 'assets/images/icon-admin-homepage/payment.png' },
    { path: '/admin-homepage/support-contact', label: 'Hỗ trợ & Liên hệ', icon: 'assets/images/icon-admin-homepage/support.png' },
    { path: '/admin-homepage/setting', label: 'Cài đặt hệ thống', icon: 'assets/images/icon-admin-homepage/settings.png' },
    { path: '/admin-homepage/logactivities', label: 'Log hoạt động', icon: 'assets/images/icon-admin-homepage/logs.png' },
  ];

  // Điều hướng khi click
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    // Xóa token và thông tin đăng nhập
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // nếu có lưu thông tin user
    localStorage.clear();
    
    // Chuyển về trang homepage và reload để reset state
    this.router.navigate(['/homepage']).then(() => {
      window.location.reload(); // Reload trang để reset toàn bộ state
    });
  }
}