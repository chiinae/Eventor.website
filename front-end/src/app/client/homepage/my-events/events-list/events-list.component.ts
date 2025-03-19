import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../../../services/event.service';

interface DisplayEvent {
  _id: string;
  event_name: string;
  hour_start: string;
  start_date: string;
  event_image: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  current_participant: number;
  max_participant: number;
  price: number;
}

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @Input() events: DisplayEvent[] = [];
  @Input() title: string = '';
  isLoading = true;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    // Chỉ load events nếu không có events được truyền vào
    if (this.events.length === 0) {
      this.loadEvents();
    } else {
      this.isLoading = false;
    }
  }

  loadEvents() {
    this.isLoading = true;
    this.eventService.getAllEvents().subscribe({
      next: (response) => {
        this.events = response.events;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Lỗi khi tải sự kiện:', error);
        this.isLoading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
