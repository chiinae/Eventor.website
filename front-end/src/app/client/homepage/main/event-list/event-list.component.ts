import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent {
  @Input() title!: string;
  @Input() events: Event[] = [];
  
  maxVisibleEvents = 8;
  showAll = false;

  constructor(private router: Router) {}

  get visibleEvents(): Event[] {
    return this.showAll ? this.events : this.events.slice(0, this.maxVisibleEvents);
  }

  get hasMoreEvents(): boolean {
    return this.events.length > this.maxVisibleEvents;
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
  }

  navigateToEvent(eventId: string) {
    this.router.navigate(['/event', eventId]);
  }

  isFreeEvent(price: number): boolean {
    return price === 0;
  }
}
