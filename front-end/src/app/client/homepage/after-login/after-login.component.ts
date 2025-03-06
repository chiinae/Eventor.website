import { Component } from '@angular/core';
import { BannerComponent } from "./banner/banner.component";
import { HighlightComponent } from "./highlight/highlight.component";
import { EventListComponent } from "./event-list/event-list.component";
import { EventPageComponent } from "./event-page/event-page.component";

@Component({
  selector: 'app-after-login',
  imports: [BannerComponent, HighlightComponent, EventListComponent, EventPageComponent],
  templateUrl: './after-login.component.html',
  styleUrl: './after-login.component.css'
})
export class AfterLoginComponent {

}
