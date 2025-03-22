import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-payment-fee',
  templateUrl: './payment-fee.component.html',
  styleUrls: ['./payment-fee.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class PaymentFeeComponent {
  
  ticketType = "GA 1-2";
  pricePerTicket = 2700000;
  quantity = 2;
  totalPrice = this.pricePerTicket * this.quantity;

  isShowingPopup = false; // Manage visibility of payment popup
  isShowingSuccessPopup = false; // Manage visibility of success popup

  constructor(private router: Router) {}

  showPaymentPopup() {
    this.isShowingPopup = true; // Show payment confirmation popup
  }

  closePopup() {
    this.isShowingPopup = false; // Close payment confirmation popup
  }

  showSuccessPopup() {
    this.isShowingSuccessPopup = true; // Show success popup
  }

  closeSuccessPopup() {
    this.isShowingSuccessPopup = false; // Close success popup
    this.router.navigate(['/homepage']); // Navigate to homepage
  }

  confirmPayment() {
    console.log('Thanh toán đã được xác nhận');
    this.closePopup(); // Close the payment popup
    this.showSuccessPopup(); // Show success popup
  }
}


