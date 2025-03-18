import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { SavedEventsComponent } from '../saved-events/saved-events.component';

interface Event {
  eventId: string;
  name: string;
  date: Date;
  type: string;
  status: 'pending' | 'completed' | 'cancelled';
  paymentTime?: Date;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  // Thuộc tính cho tìm kiếm và lọc
  searchTerm: string = '';
  selectedFilter: string = 'eventId';
  selectedEventType: string = '';
  selectedDate: string = '';

  // Thuộc tính cho phân trang
  currentPage: number = 1;
  totalPages: number = 1;
  itemsPerPage: number = 10;

  // Danh sách sự kiện đã lọc
  filteredEvents: Event[] = [];

  eventTypes: string[] = ['Concert', 'Festival', 'Conference', 'Workshop', 'Other'];

  // Dữ liệu sự kiện
  events: Event[] = [
    {
      eventId: '#WS125456',
      name: 'Workshop: Làm chủ bản thân',
      date: new Date('2024-01-13T14:05:00'),
      type: 'Workshop',
      status: 'completed',
      paymentTime: new Date('2023-12-25T10:30:00')
    },
    {
      eventId: '#CZ004125',
      name: 'Course: Khóa học nói trước đám đông',
      date: new Date('2024-01-05T00:30:00'),
      type: 'Course',
      status: 'pending',
      paymentTime: new Date('2023-12-20T15:45:00')
    },
    {
      eventId: '#FE000106',
      name: 'Festival: Lễ hội countdown 2024',
      date: new Date('2023-12-31T20:00:00'),
      type: 'Festival',
      status: 'completed',
      paymentTime: new Date('2023-12-15T09:20:00')
    },
    {
      eventId: '#CT000016',
      name: 'Contest: Understanding about life',
      date: new Date('2024-02-15T09:00:00'),
      type: 'Contest',
      status: 'pending',
      paymentTime: new Date('2024-01-05T11:30:00')
    },
    {
      eventId: '#SM472566',
      name: 'Seminar: Sách và cuộc sống',
      date: new Date('2024-01-20T14:00:00'),
      type: 'Seminar',
      status: 'completed',
      paymentTime: new Date('2023-12-28T16:15:00')
    },
    {
      eventId: '#CN789012',
      name: 'Concert: Rock Symphony Night',
      date: new Date('2024-03-01T19:30:00'),
      type: 'Concert',
      status: 'pending',
      paymentTime: new Date('2024-01-10T13:45:00')
    },
    {
      eventId: '#WS345678',
      name: 'Workshop: Digital Marketing Masterclass',
      date: new Date('2024-02-10T09:00:00'),
      type: 'Workshop',
      status: 'pending',
      paymentTime: new Date('2024-01-15T10:00:00')
    },
    {
      eventId: '#FE123456',
      name: 'Festival: Spring Music Celebration',
      date: new Date('2024-04-15T16:00:00'),
      type: 'Festival',
      status: 'pending',
      paymentTime: new Date('2024-01-20T14:30:00')
    },
    {
      eventId: '#SM567890',
      name: 'Seminar: Future of Technology',
      date: new Date('2024-02-28T13:00:00'),
      type: 'Seminar',
      status: 'cancelled',
      paymentTime: new Date('2024-01-02T09:15:00')
    },
    {
      eventId: '#CN234567',
      name: 'Concert: Classical Night',
      date: new Date('2024-03-15T20:00:00'),
      type: 'Concert',
      status: 'pending',
      paymentTime: new Date('2024-01-25T11:20:00')
    },
    {
      eventId: '#WS891234',
      name: 'Workshop: Creative Writing',
      date: new Date('2024-02-05T10:00:00'),
      type: 'Workshop',
      status: 'completed',
      paymentTime: new Date('2023-12-30T15:00:00')
    },
    {
      eventId: '#CT456789',
      name: 'Contest: Photography Challenge',
      date: new Date('2024-03-30T09:00:00'),
      type: 'Contest',
      status: 'pending',
      paymentTime: new Date('2024-01-28T16:45:00')
    },
    {
      eventId: '#SM123789',
      name: 'Seminar: Personal Finance',
      date: new Date('2024-02-20T14:00:00'),
      type: 'Seminar',
      status: 'pending',
      paymentTime: new Date('2024-01-12T10:30:00')
    },
    {
      eventId: '#FE789123',
      name: 'Festival: Food & Culture',
      date: new Date('2024-04-01T11:00:00'),
      type: 'Festival',
      status: 'pending',
      paymentTime: new Date('2024-01-30T13:15:00')
    },
    {
      eventId: '#CN456123',
      name: 'Concert: Jazz Night',
      date: new Date('2024-03-10T19:00:00'),
      type: 'Concert',
      status: 'cancelled',
      paymentTime: new Date('2024-01-08T14:20:00')
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Khởi tạo danh sách đã lọc ban đầu
    this.filteredEvents = [...this.events];
    this.calculateTotalPages();
  }

  // Phương thức tính tổng số trang
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  // Phương thức chuyển trang
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Phương thức mở rộng/thu gọn chi tiết sự kiện
  toggleEventDetails(event: Event): void {
    event.isExpanded = !event.isExpanded;
  }

  // Phương thức lọc sự kiện
  filterEvents(): void {
    let result = [...this.events];

    // Áp dụng các bộ lọc nếu có
    if (this.searchTerm || this.selectedEventType || this.selectedDate) {
      switch (this.selectedFilter) {
        case 'eventId':
          if (this.searchTerm) {
            const searchTermLower = this.searchTerm.toLowerCase();
            result = result.filter(event => 
              event.eventId.toLowerCase().includes(searchTermLower)
            );
          }
          break;
        
        case 'name':
          if (this.searchTerm) {
            const searchTermLower = this.searchTerm.toLowerCase();
            result = result.filter(event => 
              event.name.toLowerCase().includes(searchTermLower)
            );
          }
          break;
        
        case 'type':
          if (this.selectedEventType) {
            result = result.filter(event => 
              event.type === this.selectedEventType
            );
          }
          break;
        
        case 'paymentTime':
          if (this.selectedDate) {
            const selectedDate = new Date(this.selectedDate);
            result = result.filter(event => {
              if (!event.paymentTime) return false;
              return event.paymentTime.toDateString() === selectedDate.toDateString();
            });
          }
          break;
      }
    }

    // Cập nhật danh sách đã lọc
    this.filteredEvents = result;
    this.currentPage = 1; // Reset về trang đầu tiên khi lọc
    this.calculateTotalPages();
  }

  onFilterChange() {
    // Reset các giá trị tìm kiếm khi đổi loại filter
    this.searchTerm = '';
    this.selectedEventType = '';
    this.selectedDate = '';
    this.currentPage = 1;
    this.filterEvents(); // Cập nhật lại danh sách đã lọc
  }

  navigateTo(tab: string) {
    this.router.navigate(['/my-account', tab]);
  }

  logout() {
    console.log('Đăng xuất...');
  }

  getPlaceholder(): string {
    switch (this.selectedFilter) {
      case 'eventId':
        return 'Nhập mã giao dịch...';
      case 'name':
        return 'Nhập tên sự kiện...';
      case 'type':
        return 'Chọn loại sự kiện...';
      case 'paymentTime':
        return 'Chọn thời gian thanh toán...';
      default:
        return 'Tìm kiếm...';
    }
  }
}
