import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService, Event } from '../../../services/event.service';
import { forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent implements OnInit {
  activeTab: 'all' | 'created' | 'tickets' | 'saved' = 'all';
  error: string = '';

  // Khai báo các mảng sự kiện
  createdEvents: Event[] = [];
  ticketEvents: Event[] = [];
  savedEvents: Event[] = [];

  // ID mẫu cho từng danh mục
  private readonly eventIds = {
    created: ['B001', 'B002', 'B003'],
    tickets: ['B004', 'B005', 'B006'],
    saved: ['B007']
  };

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  switchTab(tab: 'all' | 'created' | 'tickets' | 'saved') {
    this.activeTab = tab;
  }

  private loadEvents() {
    console.log('Bắt đầu tải sự kiện...');

    const eventLoaders = {
      created: this.loadEventsByIds(this.eventIds.created),
      tickets: this.loadEventsByIds(this.eventIds.tickets),
      saved: this.loadEventsByIds(this.eventIds.saved)
    };

    forkJoin(eventLoaders).subscribe({
      next: (results) => {
        this.createdEvents = results.created;
        this.ticketEvents = results.tickets;
        this.savedEvents = results.saved;
        console.log('Tất cả sự kiện đã được tải thành công');
      },
      error: (error) => {
        console.error('Lỗi khi tải sự kiện:', error);
        this.error = 'Có lỗi xảy ra khi tải dữ liệu sự kiện';
      }
    });
  }

  private loadEventsByIds(ids: string[]) {
    return forkJoin(
      ids.map(id => 
        this.eventService.getEventById(id).pipe(
          catchError(error => {
            console.error(`Lỗi khi tải sự kiện ${id}:`, error);
            return of(null);
          })
        )
      )
    ).pipe(
      map(events => events.filter((event): event is Event => event !== null))
    );
  }

  shouldShowSection(section: 'created' | 'tickets' | 'saved'): boolean {
    return this.activeTab === 'all' || this.activeTab === section;
  }

  editEvent(event: Event, e: MouseEvent) {
    e.stopPropagation();
    console.log('Edit event:', event);
  }

  viewTicket(event: Event, e: MouseEvent) {
    e.stopPropagation();
    console.log('View ticket:', event);
  }

  unsaveEvent(event: Event, e: MouseEvent) {
    e.stopPropagation();
    console.log('Unsave event:', event);
  }

  navigateToEventDetail(eventId: string) {
    console.log('Navigating to event:', eventId);
    if (eventId) {
      this.router.navigate(['/event', eventId]);
    }
  }
}
