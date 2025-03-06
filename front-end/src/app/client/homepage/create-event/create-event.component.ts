import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CreateEventComponent {
  eventData = {
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    eventType: '',
    phone: '',
    eventName: '',
    eventCategory: '',
    eventDescription: '',
    eventDate: '' as string | Date,
    eventMode: '',
    eventLink: '',
    eventLocation: '',
    ticketQuantity: '' as number | string,
    ticketTypes: [{ name: '', price: '' }],
    startSale: '' as string | Date,
    endSale: '' as string | Date,
    image: '' as File | string
  };

  addTicketType() {
    this.eventData.ticketTypes.push({ name: '', price: '' });
  }

  submitEvent() {
    console.log("Event Data: ", this.eventData);
    alert("Sự kiện đã được tạo!");
  }
  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.eventData.image = file;
    }
  }
  
}

