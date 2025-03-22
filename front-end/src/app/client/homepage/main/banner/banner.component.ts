import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BannerService, Banner } from '../../../../services/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BannerComponent implements OnInit {
  banners: Banner[] = [];
  currentBanner?: Banner;
  error: string = '';

  constructor(
    private bannerService: BannerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadBanner();
  }

  private loadBanner() {
    console.log('Đang tải banner...');
    this.bannerService.getBannerById('B001').subscribe({
      next: (banner) => {
        console.log('Banner đã được tải:', banner);
        if (banner) {
          this.currentBanner = banner;
          console.log('Banner ID:', banner.id);
        } else {
          console.error('Không tìm thấy banner');
          this.error = 'Không tìm thấy banner';
        }
      },
      error: (error) => {
        console.error('Lỗi khi tải banner:', error);
        this.error = 'Không thể tải banner';
      }
    });
  }

  navigateToEvent() {
    console.log('Current banner:', this.currentBanner);
    if (this.currentBanner?.id) {
      console.log('Navigating to event with ID:', this.currentBanner.id);
      this.router.navigate(['/event', this.currentBanner.id]);
    } else {
      console.error('Không tìm thấy ID của banner');
    }
  }
}
