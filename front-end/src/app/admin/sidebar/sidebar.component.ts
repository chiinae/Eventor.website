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
    { path: '/admin-homepage/accountmanage', label: 'Quản lý tài khoản', icon: 'assets/images/icon-admin-homepage/account.png' },
    { path: '/admin-homepage/manageoverall', label: 'Quản lý sự kiện', icon: 'assets/images/icon-admin-homepage/event.png' },
    { path: '/admin-homepage/manageoverall', label: 'Danh mục sự kiện', icon: 'assets/images/icon-admin-homepage/event-category.png' },
    { path: '/admin-homepage/manageoverall', label: 'Quản lý nội dung', icon: 'assets/images/icon-admin-homepage/content.png' },
    { path: '/admin-homepage/manageoverall', label: 'Quản lý thanh toán', icon: 'assets/images/icon-admin-homepage/payment.png' },
    { path: '/admin-homepage/manageoverall', label: 'Hỗ trợ & Liên hệ', icon: 'assets/images/icon-admin-homepage/support.png' },
    { path: '/admin-homepage/manageoverall', label: 'Cài đặt hệ thống', icon: 'assets/images/icon-admin-homepage/settings.png' },
    { path: '/admin-homepage/manageoverall', label: 'Log hoạt động', icon: 'assets/images/icon-admin-homepage/logs.png' },
  ];

  // Điều hướng khi click
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  logout() {
    console.log('Đăng xuất');
    this.router.navigate(['/login']);
  }
}