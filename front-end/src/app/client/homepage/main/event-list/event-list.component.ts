import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  
  isFreeEvent(price: number): boolean {
    return price === 0;
  }
}
