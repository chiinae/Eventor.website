import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "./banner/banner.component";
import { HighlightComponent } from "./highlight/highlight.component";
import { EventListComponent } from "./event-list/event-list.component";
import { EventPageComponent } from "./event-page/event-page.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    BannerComponent,
    HighlightComponent,
    EventListComponent,
    EventPageComponent
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
}