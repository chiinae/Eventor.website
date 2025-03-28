import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Test kết nối
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  // Update information
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, user);
  }  
} 