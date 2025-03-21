import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { ContentComponent } from './content/content.component';
import { CommentSectionComponent } from "./comment-section/comment-section.component";
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-event-information',
  standalone: true,
  imports: [CommonModule, BannerComponent, ContentComponent, CommentSectionComponent, HeaderComponent, FooterComponent],
  templateUrl: './event-information.component.html',
  styleUrl: './event-information.component.css'
})
export class EventInformationComponent implements OnInit {
  eventId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    // Cuộn về đầu trang khi component được khởi tạo
    window.scrollTo(0, 0);
  }
}
