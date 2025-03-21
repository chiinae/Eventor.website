import { Component, Input, ElementRef, OnInit } from '@angular/core';
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
  @Input() imageUrl: string = '';
  event: Event | null = null;
  error: string | null = null;
  hasError: boolean = false;

  constructor(private eventService: EventService, private el: ElementRef) {}

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

    if (this.imageUrl) {
      // Set the background image for blur effect
      this.el.nativeElement.style.setProperty('--banner-image', `url(${this.imageUrl})`);
    }
  }

  onImageError() {
    this.hasError = true;
  }

  onImageLoad() {
    this.hasError = false;
  }
}
