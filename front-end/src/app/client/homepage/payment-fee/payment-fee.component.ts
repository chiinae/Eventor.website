import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaymentPopupComponent } from './payment-popup/payment-popup.component';

@Component({
  selector: 'app-payment-fee',
  templateUrl: './payment-fee.component.html',
  styleUrl: './payment-fee.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MatDialogModule]

})
export class PaymentFeeComponent {
  
  ticketType = "GA 1-2";
  pricePerTicket = 2700000;
  quantity = 2;
  totalPrice = this.pricePerTicket * this.quantity;

  showQRCodePopup = false; // Popup QR Code
  showResultPopup = false; // Popup kết quả thanh toán
  isPaymentSuccessful: boolean | null = null; // Trạng thái giao dịch

  confirmPayment() {
    this.showQRCodePopup = true; // Hiện popup QR Code
  }

  processPayment() {
    // Giả lập kết quả giao dịch (thành công 70%, thất bại 30%)
    this.isPaymentSuccessful = Math.random() > 0.3;

    this.showQRCodePopup = false; // Ẩn popup QR
    this.showResultPopup = true; // Hiện popup kết quả
  }

  closePopup() {
    this.showQRCodePopup = false;
    this.showResultPopup = false;
  }
}


