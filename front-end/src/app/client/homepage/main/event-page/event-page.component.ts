import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "../banner/banner.component";
import { HighlightComponent } from "../highlight/highlight.component";
import { EventListComponent } from "../event-list/event-list.component";
import { EventService, Event } from '../../../../services/event.service';
import { forkJoin } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, BannerComponent, HighlightComponent, EventListComponent],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent implements OnInit {
  recommendedEvents: Event[] = [];
  upcomingEvents: Event[] = [];
  freeEvents: Event[] = [];

  private readonly freeEventIds = ['B005', 'B006'];
  private readonly upcomingEventIds = ['B005', 'B006', 'B007', 'B002'];
  private readonly recommendedEventIds = ['B003', 'B005', 'B002'];

  constructor(private eventService: EventService) {
    console.log('EventPageComponent được khởi tạo');
    // Test API lấy tất cả events
    this.eventService.getAllEvents().subscribe({
      next: (response: {total: number, events: Event[]}) => {
        console.log('Test API - Tất cả events:', response);
      },
      error: (error: any) => {
        console.error('Test API - Lỗi khi lấy tất cả events:', error);
      }
    });
  }

  ngOnInit() {
    console.log('EventPageComponent bắt đầu load dữ liệu');
    this.loadEvents();
  }

  private loadEvents() {
    console.log('Bắt đầu load các events...');
    
    // Load sự kiện cho recommended events
    console.log('Loading recommended events:', this.recommendedEventIds);
    forkJoin(
      this.recommendedEventIds.map(id => 
        this.eventService.getEventById(id).pipe(
          tap(event => console.log(`Loaded recommended event ${id}:`, event)),
          catchError(error => {
            console.error(`Lỗi khi tải recommended event ${id}:`, error);
            return of(null);
          })
        )
      )
    ).subscribe(events => {
      this.recommendedEvents = events.filter((event): event is Event => event !== null);
      console.log('Recommended events loaded:', this.recommendedEvents);
    });

    // Load sự kiện cho upcoming events
    console.log('Loading upcoming events:', this.upcomingEventIds);
    forkJoin(
      this.upcomingEventIds.map(id => 
        this.eventService.getEventById(id).pipe(
          tap(event => console.log(`Loaded upcoming event ${id}:`, event)),
          catchError(error => {
            console.error(`Lỗi khi tải upcoming event ${id}:`, error);
            return of(null);
          })
        )
      )
    ).subscribe(events => {
      this.upcomingEvents = events.filter((event): event is Event => event !== null);
      console.log('Upcoming events loaded:', this.upcomingEvents);
    });

    // Load sự kiện cho free events
    console.log('Loading free events:', this.freeEventIds);
    forkJoin(
      this.freeEventIds.map(id => 
        this.eventService.getEventById(id).pipe(
          tap(event => console.log(`Loaded free event ${id}:`, event)),
          catchError(error => {
            console.error(`Lỗi khi tải free event ${id}:`, error);
            return of(null);
          })
        )
      )
    ).subscribe(events => {
      this.freeEvents = events.filter((event): event is Event => event !== null);
      console.log('Free events loaded:', this.freeEvents);
    });
  }
}
