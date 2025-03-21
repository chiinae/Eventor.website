import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  isShowingPopup = false;
  isShowingSuccessPopup = false;

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
  }

  confirmPayment() {
    // Xử lý logic xác nhận thanh toán ở đây
    console.log('Thanh toán đã được xác nhận');
    this.closePopup();
  }
}
