import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, map, of } from 'rxjs';

export interface Event {
  _id: string;
  id: string;
  event_name: string;
  hour_start: string;
  start_date: string;
  description: string;
  category_id: string;
  status: string;
  max_participant: number;
  current_participant: number;
  created_at: string;
  format: string;
  organizer:{
    name: string;
    phone: string;
    email: string;
  }
  location: {
    name: string;
    address: string;
    city: string;
  };
  price: number;
  image: string;
  event_image: string;
  tickets: {
    tier: string;
    price: number;
    quantity: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl = 'http://localhost:5000/api/event';

  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<{total: number, events: Event[]}> {
    console.log('Đang gọi API lấy tất cả events');
    return this.http.get<{total: number, events: Event[]}>(this.apiUrl).pipe(
      tap(response => {
        console.log('Nhận được danh sách events:', response);
      }),
      catchError(error => {
        console.error('Lỗi khi lấy danh sách events:', error);
        throw error;
      })
    );
  }

  getEventById(id: string): Observable<Event> {
    console.log(`Đang gọi API lấy event với ID: ${id}`);
    return this.http.get<Event>(`${this.apiUrl}/${id}`).pipe(
      tap(event => {
        console.log(`Nhận được dữ liệu event ${id}:`, event);
        if (!event) {
          console.warn(`Không tìm thấy event với ID ${id}`);
        }
      }),
      catchError(error => {
        console.error(`Lỗi khi lấy event ${id}:`, error);
        throw error;
      })
    );
  }

  searchEvents(query: string): Observable<Event[]> {
    console.log(`Đang tìm kiếm events với query: ${query}`);
    return this.getAllEvents().pipe(
      map(response => {
        const events = response.events;
        // Lọc các sự kiện có title chứa query (không phân biệt hoa thường)
        return events.filter(event => 
          event.event_name.toLowerCase().includes(query.toLowerCase())
        );
      }),
      tap(events => {
        console.log('Kết quả tìm kiếm:', events);
      }),
      catchError(error => {
        console.error('Lỗi khi tìm kiếm events:', error);
        return of([]);
      })
    );
  }
} 