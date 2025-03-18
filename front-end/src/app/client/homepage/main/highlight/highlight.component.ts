import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerService, Banner } from '../../../../services/banner.service';

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

  constructor(private bannerService: BannerService) {}

  ngOnInit() {
    this.loadHighlightBanners();
  }

  private loadHighlightBanners() {
    this.bannerIds.forEach(id => {
      this.bannerService.getBannerById(id).subscribe({
        next: (banner) => {
          if (banner) {
            this.highlightImages.push(banner);
            console.log(`Đã tải banner ${id}:`, banner);
          }
        },
        error: (error) => {
          console.error(`Lỗi khi tải banner ${id}:`, error);
          this.error = `Không thể tải banner ${id}`;
        }
      });
    });
  }
}
