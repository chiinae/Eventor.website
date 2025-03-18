import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "../main/banner/banner.component";
import { HighlightComponent } from "../main/highlight/highlight.component";
import { EventListComponent } from "../main/event-list/event-list.component";
import { EventService, Event } from '../../../services/event.service';
import { forkJoin } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-events',
  standalone: true,
  imports: [CommonModule, BannerComponent, HighlightComponent, EventListComponent],
  templateUrl: './listevents.component.html',
  styleUrl: './listevents.component.css'
})
export class ListEventsComponent implements OnInit {
  selectedCategory: string = 'all';
  error: string = '';

  // Khai báo các mảng sự kiện
  recommendedEvents: Event[] = [];
  thisWeekEvents: Event[] = [];
  freeEvents: Event[] = [];
  sportsEvents: Event[] = [];
  artEvents: Event[] = [];
  foodDrinkEvents: Event[] = [];
  charityEvents: Event[] = [];
  musicEvents: Event[] = [];
  onlineEvents: Event[] = [];
  forYouEvents: Event[] = [];

  // Khai báo các ID cho từng danh mục
  private readonly eventIds = {
    thisWeekEvents: ['B002', 'B003','B003', 'B004', 'B005', 'B001', 'B002', 'B003', 'B004', 'B005'],
    free: ['B001', 'B002', 'B003', 'B004', 'B005', 'B003', 'B004', 'B005', 'B001', 'B002', 'B003', 'B004', 'B005'],
    recommended: ['B006', 'B007'],
    forYou: ['B002', 'B003', 'B004', 'B005'],
    online: ['B003', 'B004', 'B005', 'B001', 'B002', 'B003', 'B004', 'B005'],
    music: ['B001', 'B002', 'B003'],
    sports: ['B002', 'B003', 'B004'],
    art: ['B001', 'B002', 'B003'],
    food: ['B002', 'B003', 'B004'],
    charity: ['B004', 'B005', 'B003', 'B004', 'B005', 'B001', 'B002', 'B003', 'B004', 'B005']
  };

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadAllEvents();
  }

  private loadAllEvents() {
    console.log('Bắt đầu tải tất cả sự kiện...');

    // Tạo một object chứa tất cả các observable để load events
    const eventLoaders = {
      recommended: this.loadEventsByIds(this.eventIds.recommended, 'recommended'),
      thisWeekEvents: this.loadEventsByIds(this.eventIds.thisWeekEvents, 'thisWeekEvents'),
      free: this.loadEventsByIds(this.eventIds.free, 'free'),
      forYou: this.loadEventsByIds(this.eventIds.forYou, 'forYou'),
      online: this.loadEventsByIds(this.eventIds.online, 'online'),
      music: this.loadEventsByIds(this.eventIds.music, 'music'),
      sports: this.loadEventsByIds(this.eventIds.sports, 'sports'),
      art: this.loadEventsByIds(this.eventIds.art, 'art'),
      food: this.loadEventsByIds(this.eventIds.food, 'foodDrink'),
      charity: this.loadEventsByIds(this.eventIds.charity, 'charity')
    };

    // Sử dụng forkJoin để load tất cả events song song
    forkJoin(eventLoaders).subscribe({
      next: (results) => {
        this.recommendedEvents = results.recommended;
        this.thisWeekEvents = results.thisWeekEvents;
        this.freeEvents = results.free;
        this.forYouEvents = results.forYou;
        this.onlineEvents = results.online;
        this.musicEvents = results.music;
        this.sportsEvents = results.sports;
        this.artEvents = results.art;
        this.foodDrinkEvents = results.food;
        this.charityEvents = results.charity;
        
        console.log('Tất cả sự kiện đã được tải thành công');
      },
      error: (error) => {
        console.error('Lỗi khi tải sự kiện:', error);
        this.error = 'Có lỗi xảy ra khi tải dữ liệu sự kiện';
      }
    });
  }

  private loadEventsByIds(ids: string[], category: string) {
    console.log(`Đang tải sự kiện cho danh mục ${category}...`);
    return forkJoin(
      ids.map(id => 
        this.eventService.getEventById(id).pipe(
          tap(event => console.log(`Đã tải sự kiện ${id} cho ${category}:`, event)),
          catchError(error => {
            console.error(`Lỗi khi tải sự kiện ${id} cho ${category}:`, error);
            return of(null);
          })
        )
      )
    ).pipe(
      map(events => events.filter((event): event is Event => event !== null))
    );
  }

  filterEvents(category: string) {
    this.selectedCategory = category;
  }

  shouldShowCategory(category: string): boolean {
    if (this.selectedCategory === 'all') return true;
    return this.selectedCategory === category;
  }
}
