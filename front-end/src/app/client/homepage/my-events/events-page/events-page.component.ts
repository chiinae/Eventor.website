import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventsListComponent } from '../events-list/events-list.component';
import { EventService, Event } from '../../../../services/event.service';
// import { EventPageComponent } from '../../main/event-page/event-page.component';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [CommonModule, RouterModule, EventsListComponent],
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.css']
})
export class EventsPageComponent implements OnInit {
  AllEvents: Event[] = [];
  error: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        console.log('Dữ liệu events từ backend:', response);
        this.AllEvents = response.events;
      },
      error: (error) => {
        console.error('Lỗi khi tải sự kiện:', error);
        this.error = 'Không thể tải danh sách sự kiện';
      }
    });
  }
}
