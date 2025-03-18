import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventListComponent } from "../events-list/events-list.component";
import { EventService, Event } from '../../../../services/event.service';
// import { EventPageComponent } from '../../main/event-page/event-page.component';

interface DisplayEvent {
  name: string;
  date: string;
  location: string;
  image: string;
  isFree: boolean;
  price: number;
}

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [CommonModule, EventListComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent implements OnInit {
  AllEvents: DisplayEvent[] = [];
  error: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadAllEvents();
  }

  private loadAllEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        console.log('Dữ liệu events từ backend:', response);
        // Chuyển đổi dữ liệu từ backend sang định dạng hiển thị
        this.AllEvents = response.events.map(event => ({
          name: event.event_name,
          date: `${event.hour_start} ${event.start_date}`,
          location: event.location.city,
          image: event.event_image,
          isFree: event.price === 0,
          price: event.price
        }));
      },
      error: (error) => {
        console.error('Lỗi khi lấy dữ liệu events:', error);
        this.error = 'Không thể tải danh sách sự kiện';
      }
    });
  }
}
