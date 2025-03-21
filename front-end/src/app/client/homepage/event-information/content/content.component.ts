import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EventService, Event } from '../../../../services/event.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css',
  providers: [EventService, DecimalPipe, DatePipe]
})
export class ContentComponent implements OnInit {
  @Input() eventId: string | null = null;
  event: Event | null = null;
  error: string | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    if (this.eventId) {
      this.loadEventData();
    } else {
      this.error = 'Không tìm thấy ID sự kiện';
    }
  }

  private loadEventData() {
    this.eventService.getEventById(this.eventId!).subscribe({
      next: (event: Event) => {
        if (event) {
          this.event = event;
        } else {
          this.error = 'Không tìm thấy thông tin sự kiện';
        }
      },
      error: (error: any) => {
        console.error('Error loading event:', error);
        this.error = 'Có lỗi xảy ra khi tải thông tin sự kiện. Vui lòng thử lại sau.';
      }
    });
  }
}
