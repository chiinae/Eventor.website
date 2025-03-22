import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerService, Banner } from '../../../../services/banner.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.css'
})
export class HighlightComponent implements OnInit {
  highlightImages: Banner[] = [];
  error: string = '';
  bannerIds = ['B002', 'B003', 'B004', 'B005', 'B006', 'B007'];

  constructor(
    private bannerService: BannerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHighlightBanners();
  }

  private loadHighlightBanners() {
    const bannerRequests = this.bannerIds.map(id => 
      this.bannerService.getBannerById(id)
    );

    forkJoin(bannerRequests).subscribe({
      next: (banners) => {
        this.highlightImages = banners.filter((banner): banner is Banner => banner !== null);
        console.log('Đã tải tất cả banner:', this.highlightImages);
      },
      error: (error) => {
        console.error('Lỗi khi tải banners:', error);
        this.error = 'Không thể tải banners';
      }
    });
  }

  navigateToEvent(bannerId: string) {
    console.log('Navigating to event:', bannerId);
    this.router.navigate(['/event', bannerId]);
  }
}
