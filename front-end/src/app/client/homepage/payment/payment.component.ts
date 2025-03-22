import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  isShowingPopup = false;
  isShowingSuccessPopup = false;

  constructor(private router: Router) {}

  showPaymentPopup() {
    this.isShowingPopup = true;
  }

  closePopup() {
    this.isShowingPopup = false;
  }

  showSuccessPopup() {
    this.isShowingSuccessPopup = true;
  }

  closeSuccessPopup() {
    this.isShowingSuccessPopup = false;
    this.router.navigate(['/homepage']);
  }

  confirmPayment() {
    // Xử lý logic xác nhận thanh toán ở đây
    console.log('Thanh toán đã được xác nhận');
    this.closePopup();
    this.showSuccessPopup();
  }
}
