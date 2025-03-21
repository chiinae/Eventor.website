import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eventmanage',
  imports: [CommonModule, RouterModule],
  templateUrl: './eventmanage.component.html',
  styleUrl: './eventmanage.component.css'
})
export class EventmanageComponent {
  constructor(private router: Router) {}
  
  
  EventCards = [
    { title: 'Sự kiện hiện tại', icon: 'assets/images/icon-admin-homepage/currentevent.png', route: '/admin/currentevent' },
    { title: 'Sự kiện chưa duyệt', icon: 'assets/images/icon-admin-homepage/event-category.png', route: '/admin/roles' },
  ];

  ngOnInit() {
    console.log(this.EventCards); // Kiểm tra xem mảng có dữ liệu không
  }

  goToPage(route: string) {
    this.router.navigate([route]);
  }

}
