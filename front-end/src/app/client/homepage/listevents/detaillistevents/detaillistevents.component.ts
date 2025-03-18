import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Event } from '../../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detaillistevents.component.html',
  styleUrl: './detaillistevents.component.css'
})

export class DetaillisteventsComponent implements OnInit { 
  @Input() title!: string; 
  @Input() events: Event[] = [];
  
  ngOnInit() {
    console.log(`EventListComponent "${this.title}" received events:`, this.events);
  }

  isFreeEvent(price: number): boolean {
    return price === 0;
  }
}
