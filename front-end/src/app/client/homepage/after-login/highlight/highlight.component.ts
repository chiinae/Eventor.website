import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlight',
  standalone: true,
  imports: [CommonModule], // Thêm CommonModule vào đây
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.css'
})
export class HighlightComponent {
  highlightImages: string[] = [
    '../../../../assets/images/after-login/image1.png',
    '../../../../assets/images/after-login/image2.png',
    '../../../../assets/images/after-login/image3.png',
    '../../../../assets/images/after-login/event1.png',
    '../../../../assets/images/after-login/event9.png',
    '../../../../assets/images/after-login/event6.png',
    '../../../../assets/images/after-login/event7.png',

  ];

}
