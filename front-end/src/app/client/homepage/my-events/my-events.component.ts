import { Component } from '@angular/core';
import { EventsPageComponent } from "./events-page/events-page.component";

@Component({
  selector: 'app-my-events',
  imports: [EventsPageComponent],
  templateUrl: './my-events.component.html',
  styleUrl: './my-events.component.css'
})
export class MyEventsComponent {

}
