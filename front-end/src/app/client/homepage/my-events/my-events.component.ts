import { Component } from '@angular/core';
import { EventsPageComponent } from "./events-page/events-page.component";
import { EventService, Event } from '../../../services/event.service';
@Component({
  selector: 'app-my-events',
  imports: [EventsPageComponent ],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {

  constructor(private eventService: EventService) {}


}
