import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apply-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './apply-form.component.html',
  styleUrl: './apply-form.component.css',
})
export class ApplyFormComponent {
  @Output() close = new EventEmitter<void>();

  closeForm() {
    console.log("❌ Đóng form ứng tuyển!");
    this.close.emit();
  }
}
