import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface Event {
  id: string;
  title: string;
  imageUrl: string;
  date: Date;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'active' | 'pending' | 'completed';
}

@Component({
  selector: 'app-saved-events',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './saved-events.component.html',
  styleUrls: ['./saved-events.component.css']
})
export class SavedEventsComponent implements OnInit {
  events: Event[] = [];
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // TODO: Load events from service
    this.loadEvents();
  }

  private loadEvents() {
    // Simulate loading data
    setTimeout(() => {
      this.events = [
        {
          id: '1',
          title: 'Workshop: Làm chủ bản thân',
          imageUrl: 'https://i.postimg.cc/g0LSDjk6/banner.png',
          date: new Date('2025-01-14'),
          location: 'Hà Nội',
          participants: 45,
          maxParticipants: 50,
          status: 'active'
        },
        // Add more mock data as needed
      ];
      this.isLoading = false;
    }, 1000);
  }

  navigateToEvent(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'active':
        return 'Đang diễn ra';
      case 'pending':
        return 'Chờ duyệt';
      case 'completed':
        return 'Đã kết thúc';
      default:
        return status;
    }
  }
}
