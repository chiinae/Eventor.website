import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface EventData {
  [key: string]: string | File | { name: string; price: string }[];
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  eventType: string;
  phone: string;
  eventName: string;
  eventCategory: string;
  eventDescription: string;
  eventDate: string;
  eventMode: string;
  eventLink: string;
  eventLocation: string;
  ticketQuantity: string;
  ticketTypes: { name: string; price: string }[];
  startSale: string;
  endSale: string;
  image: string | File;
}

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  isShowingSuccessPopup = false;
  formErrors: { [key: string]: boolean } = {};
  
  eventData: EventData = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    eventType: '',
    phone: '',
    eventName: '',
    eventCategory: '',
    eventDescription: '',
    eventDate: '',
    eventMode: 'offline',
    eventLink: '',
    eventLocation: '',
    ticketQuantity: '',
    ticketTypes: [{ name: '', price: '' }],
    startSale: '',
    endSale: '',
    image: ''
  };

  constructor(private router: Router) {}

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'organization',
      'eventType',
      'phone',
      'eventName',
      'eventCategory',
      'eventDescription',
      'eventDate',
      'eventLocation',
      'ticketQuantity',
      'startSale',
      'endSale'
    ] as const;

    requiredFields.forEach(field => {
      if (!this.eventData[field]) {
        this.formErrors[field] = true;
        isValid = false;
      }
    });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.eventData.email && !emailRegex.test(this.eventData.email)) {
      this.formErrors['email'] = true;
      isValid = false;
    }

    // Validate phone number (10-11 digits)
    const phoneRegex = /^[0-9]{10,11}$/;
    if (this.eventData.phone && !phoneRegex.test(this.eventData.phone)) {
      this.formErrors['phone'] = true;
      isValid = false;
    }

    // Validate ticket types
    if (this.eventData.ticketTypes.length === 0 || 
        this.eventData.ticketTypes.some(ticket => !ticket.name || !ticket.price)) {
      this.formErrors['ticketTypes'] = true;
      isValid = false;
    }

    // Validate dates
    const currentDate = new Date();
    const eventDate = new Date(this.eventData.eventDate);
    const startSale = new Date(this.eventData.startSale);
    const endSale = new Date(this.eventData.endSale);

    if (eventDate <= currentDate) {
      this.formErrors['eventDate'] = true;
      isValid = false;
    }

    if (startSale >= endSale) {
      this.formErrors['startSale'] = true;
      this.formErrors['endSale'] = true;
      isValid = false;
    }

    if (endSale >= eventDate) {
      this.formErrors['endSale'] = true;
      isValid = false;
    }

    return isValid;
  }

  addTicketType() {
    this.eventData.ticketTypes.push({ name: '', price: '' });
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventData.image = file;
    }
  }

  submitEvent() {
    if (this.validateForm()) {
      // Xử lý logic gửi dữ liệu sự kiện
      console.log('Event data:', this.eventData);
      
      // Hiển thị popup thành công
      this.isShowingSuccessPopup = true;

      // Tự động ẩn popup sau 2 giây
      setTimeout(() => {
        this.isShowingSuccessPopup = false;
      }, 2000);
    }
  }
}

