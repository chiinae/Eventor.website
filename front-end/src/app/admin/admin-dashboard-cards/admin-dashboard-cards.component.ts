import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard-cards.component.html',
  styleUrls: ['./admin-dashboard-cards.component.css']
})
export class AdminDashboardCardsComponent {
  dashboardCards = [
    { title: 'Quản lý tài khoản', icon: '..\\assets\\images\\icon-admin-homepage\\account.png', route: '/admin/accounts' },
    { title: 'Quản lý sự kiện', icon: '..\\assets\\images\\icon-admin-homepage\\event.png', route: '/admin/events' },
    { title: 'Quản lý nội dung', icon: '..\\assets\\images\\icon-admin-homepage\\content.png', route: '/admin/content' },
    { title: 'Quản lý thanh toán', icon: '..\\assets\\images\\icon-admin-homepage\\payment.png', route: '/admin/payments' },
    { title: 'Hỗ trợ & Liên hệ', icon: '..\\assets\\images\\icon-admin-homepage\\support.png', route: '/admin/support' },
    { title: 'Cài đặt hệ thống', icon: '..\\assets\\images\\icon-admin-homepage\\settings.png', route: '/admin/settings' },
    { title: 'Log hoạt động', icon: '..\\assets\\images\\icon-admin-homepage\\logs.png', route: '/admin/logs' }
  ];

  constructor(private router: Router) {}

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
