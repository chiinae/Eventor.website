import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
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

  constructor(
    private eventService: EventService, 
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.eventId) {
      this.eventService.getEventById(this.eventId).subscribe({
        next: (event: Event) => {
          this.event = event;
          if (event.event_image) {
            this.setBackground(event.event_image);
          }
        },
        error: (error: any) => {
          console.error('Error loading event:', error);
          this.error = 'Không thể tải thông tin sự kiện';
        }
      });
    }
  }

  navigateToEvent() {
    if (this.eventId) {
      this.router.navigate(['/event', this.eventId]);
    }
  }

  setBackground(imageUrl: string) {
    const container = this.el.nativeElement.querySelector('.banner-container') as HTMLElement;
    if (container) {
      container.style.setProperty('--banner-bg', `url(${imageUrl})`);
    }
  }
}
