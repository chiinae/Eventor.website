import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.loadBanner();
  }

  private loadBanner() {
    console.log('Đang tải banner...');
    this.bannerService.getBannerById('B001').subscribe({
      next: (banner) => {
        console.log('Banner đã được tải:', banner);
        if (banner && banner.imageUrl) {
          this.currentBanner = banner;
        } else {
          console.error('Banner không có URL hình ảnh');
          this.error = 'Banner không có URL hình ảnh';
        }
      },
      error: (error) => {
        console.error('Lỗi khi tải banner:', error);
        this.error = 'Không thể tải banner';
      }
    });
  }
}
