import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ⚠️ Import thêm cái này
import { EventListComponent } from "../events-list/events-list.component";
import { EventPageComponent } from '../../main/event-page/event-page.component';

@Component({
  selector: 'app-events-page',
  standalone: true,
  imports: [CommonModule, EventListComponent, EventPageComponent],
  templateUrl: './events-page.component.html',
  styleUrl: './events-page.component.css'
})
export class EventsPageComponent {
  MyEvents = [
    { name: 'Workshop: Hành trình hướng nghiệp', date: '10:00 03/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event1.png', isFree: true, price: 0 },
    
    { name: 'Event: yêu Merchandise - all for Hoàng Dũng', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event2.png', isFree: true, price: 0 },

    { name: 'Workshop: KOKEDAMA - From the earth to the art', date: '8:00 02/03/2025', location: 'TP.Hồ Chí Minh', image: '../../../../assets/images/after-login/event3.png', isFree: true, price: 0 },
    

  ];

  SavedEvents = [
    { name: 'Fan Meeting: Juniverse Hà Nội', date: '14:00 01/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event4.png', isFree: false, price: 150000 },
    { name: 'Event: yêu Merchandise - all for Hoàng Dũng', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event1.png', isFree: true, price: 0 },
    { name: 'Gala: Đêm chung kết hoa khôi sinh viên Việt Nam', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event9.png', isFree: true, price: 0 },
    { name: 'Fan Meeting: LMS’s First Meeting in Vietnam', date: '16:00 01/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event5.png', isFree: true, price: 0 },
  ];

  CreatedEvents = [
    { name: 'Fan Meeting: LMS’s First Meeting in Vietnam', date: '16:00 01/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event5.png', isFree: true, price: 0 },
    { name: 'Event: yêu Merchandise - all for Hoàng Dũng', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event2.png', isFree: true, price: 0 },
    { name: 'Festival: SYAWALAN KELUARGA KETUT SUSILO', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event6.png', isFree: true, price: 0 },
    { name: 'Hành trình lan tỏa yêu thương cùng Lương Thùy Linh', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event7.png', isFree: true, price: 0 },
    { name: 'Workshop - Kể chuyện nghìn năm Sài Gòn', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event8.png', isFree: true, price: 0 },
    { name: 'Gala: Đêm chung kết hoa khôi sinh viên Việt Nam', date: '8:00 02/03/2025', location: 'Hà Nội', image: '../../../../assets/images/after-login/event9.png', isFree: true, price: 0 },
  ];
}
