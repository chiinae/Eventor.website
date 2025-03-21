import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-logactivities',
  imports: [CommonModule, RouterModule],
  templateUrl: './logactivities.component.html',
  styleUrl: './logactivities.component.css'
})
export class LogactivitiesComponent {
  constructor(private router: Router) {}
  
  
  EventCards = [
    { title: 'Hoạt động của hệ thống', icon: 'assets/images/icon-admin-homepage/TV.png', route: '/admin/TV' },
    { title: 'Hoạt động của admin', icon: 'assets/images/icon-admin-homepage/admin.png', route: '/admin/admin' },
    { title: 'Hoạt động của người dùng', icon: 'assets/images/icon-admin-homepage/account.png', route: '/admin/account' },

  ];

  ngOnInit() {
    console.log(this.EventCards); // Kiểm tra xem mảng có dữ liệu không
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }
}
