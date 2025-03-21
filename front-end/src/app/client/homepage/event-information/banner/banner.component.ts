import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventService, Event } from '../../../../services/event.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  providers: [EventService]
})
export class BannerComponent implements OnInit {
  @Input() eventId: string | null = null;
  event: Event | null = null;
  error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (event: Event) => {
          this.event = event;
        },
        error: (error: any) => {
          console.error('Error loading event:', error);
          this.error = 'Không thể tải thông tin sự kiện';
        }
      });
    }
  }
}
