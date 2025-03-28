import { Component, OnInit, Input } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { EventService, Event } from '../../../../services/event.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  showMap: boolean = false;
  mapUrl: SafeResourceUrl = '';

  constructor(
    private eventService: EventService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    if (this.eventId) {
      this.loadEventData();
    } else {
      this.error = 'Không tìm thấy ID sự kiện';
    }
  }

  navigateToPayment() {
    if (!this.event) return;

    // Kiểm tra xem có vé miễn phí không
    const hasFreeTicket = this.event.tickets.some(ticket => ticket.price === 0);
    const hasPaymentTicket = this.event.tickets.some(ticket => ticket.price > 0);

    if (hasFreeTicket && !hasPaymentTicket) {
      // Nếu chỉ có vé miễn phí
      this.router.navigate(['/homepage/payment-free'], { queryParams: { eventId: this.eventId } });
    } else {
      // Nếu có vé phải trả phí
      this.router.navigate(['/homepage/payment-fee'], { queryParams: { eventId: this.eventId } });
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

  openMap() {
    if (this.event) {
      const address = encodeURIComponent(
        `${this.event.location.name}, ${this.event.location.address}`
      );
      // Sử dụng Google Maps URL trực tiếp thay vì Embed API
      const url = `https://www.google.com/maps/search/?api=1&query=${address}`;
      window.open(url, '_blank');
      
      // Hoặc nếu bạn muốn vẫn giữ popup, sử dụng URL embed này:
      // const url = `https://www.google.com/maps/embed/v1/search?q=${address}&zoom=15&key=YOUR_API_KEY`;
      // this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      // this.showMap = true;
    }
  }

  closeMap() {
    this.showMap = false;
  }
}
