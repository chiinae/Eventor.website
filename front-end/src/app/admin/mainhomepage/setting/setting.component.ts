import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-setting',
  imports: [CommonModule, RouterModule],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  constructor(private router: Router) {}
  
  
  EventCards = [
    { title: 'Quản lý tài khoản admin', icon: 'assets/images/icon-admin-homepage/account.png', route: '/admin/account' },
    { title: 'Quản lý danh sách tài khoản admin', icon: 'assets/images/icon-admin-homepage/listsadmin.png', route: '/admin/listaccount' },
    { title: 'Cài đặt chung', icon: 'assets/images/icon-admin-homepage/settings.png', route: '/admin/setting' },
  ];

  ngOnInit() {
    console.log(this.EventCards); // Kiểm tra xem mảng có dữ liệu không
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }

}
