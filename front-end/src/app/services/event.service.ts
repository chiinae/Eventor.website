import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

export interface Event {
  _id: string;
  id: string;
  event_name: string;
  hour_start: string;
  start_date: string;
  location: string;
  price: number;
  image: string;
  event_image: string;
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
      }),
      catchError(error => {
        console.error(`Lỗi khi lấy event ${id}:`, error);
        throw error;
      })
    );
  }
} 