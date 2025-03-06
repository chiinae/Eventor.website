import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})

export class EventListComponent { 
  @Input() title!: string; // Nhận tiêu đề danh sách sự kiện
  @Input() events: { name: string, date: string, location: string, image: string, isFree: boolean, price: number }[] = []; // Nhận danh sách sự kiện từ component cha
  
}
