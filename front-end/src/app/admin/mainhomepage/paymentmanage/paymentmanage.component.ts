import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-paymentmanage',
  imports: [CommonModule, RouterModule],
  templateUrl: './paymentmanage.component.html',
  styleUrl: './paymentmanage.component.css'
})
export class PaymentmanageComponent {
  constructor(private router: Router) {}
  
  
  dashboardCards = [
    { title: 'Giao dịch mua vé', icon: 'assets/images/icon-admin-homepage/buyticket.png', route: '/admin/buyticket' },
    { title: 'Xử lý hoàn tiền', icon: 'assets/images/icon-admin-homepage/returnmoney.png', route: '/admin/returnmoney' },
    { title: 'Quản lý báo cáo doanh thu', icon: 'assets/images/icon-admin-homepage/revenue.png', route: '/admin/revenue' }
  ];

  ngOnInit() {
    console.log(this.dashboardCards); // Kiểm tra xem mảng có dữ liệu không
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
