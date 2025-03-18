import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-accountmanage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './accountmanage.component.html',
  styleUrls: ['./accountmanage.component.css']
})
export class AccountmanageComponent {
  constructor(private router: Router) {}
  
  
  dashboardCards = [
    { title: 'Quản lý tài khoản người dùng', icon: 'assets/images/icon-admin-homepage/clientmanage.png', route: '/admin/users' },
    { title: 'Quản lý phân quyền', icon: 'assets/images/icon-admin-homepage/role.png', route: '/admin/roles' },
    { title: 'Nâng hạng thành viên', icon: 'assets/images/icon-admin-homepage/membership.png', route: '/admin/membership' }
  ];

  ngOnInit() {
    console.log(this.dashboardCards); // Kiểm tra xem mảng có dữ liệu không
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
