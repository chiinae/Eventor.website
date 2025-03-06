import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { CommentSectionComponent } from "./comment-section/comment-section.component";

@Component({
  selector: 'app-event-information',
  imports: [BannerComponent, ContentComponent, CommentSectionComponent],
  templateUrl: './event-information.component.html',
  styleUrl: './event-information.component.css'
})
export class EventInformationComponent {

}
