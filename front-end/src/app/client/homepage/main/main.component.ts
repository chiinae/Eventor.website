import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventPageComponent } from "./event-page/event-page.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    EventPageComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
}