import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, UserStats, ApiResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    console.log('=== Getting headers ===');
    console.log('Token from localStorage:', token);
    
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    console.log('Created headers:', headers);
    return headers;
  }

  getUserById(id: string): Observable<ApiResponse<User>> {
    console.log('Getting user by ID:', id);
    const headers = this.getHeaders();
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/id/${id}`, { headers });
  }

  updateUser(id: string, userData: Partial<User>): Observable<ApiResponse<User>> {
    console.log('=== Start updateUser ===');
    console.log('Input parameters:', { id, userData });
    
    // Lấy token trực tiếp để kiểm tra
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    
    // Tạo headers với token
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`);
    
    console.log('Headers created:', {
      contentType: headers.get('Content-Type'),
      authorization: headers.get('Authorization')
    });
    
    const url = `${this.apiUrl}/users/id/${id}`;
    console.log('Request URL:', url);
    console.log('Request body:', userData);

    // Thêm log cho toàn bộ request config
    console.log('Request config:', {
      method: 'PUT',
      url,
      headers: {
        'Content-Type': headers.get('Content-Type'),
        'Authorization': headers.get('Authorization')
      },
      body: userData
    });

    return this.http.put<ApiResponse<User>>(url, userData, { headers }).pipe(
      map(response => {
        console.log('Server response:', response);
        if (!response.success) {
          console.error('Update failed:', response.message);
          throw new Error(response.message || 'Cập nhật thất bại');
        }
        console.log('Update successful:', response.user);
        return response;
      }),
      catchError(error => {
        console.error('HTTP Error:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        throw error;
      })
    );
  }

  getUserByEmail(email: string): Observable<ApiResponse<User>> {
    console.log('Getting user by email:', email);
    const headers = this.getHeaders();
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/email/${email}`, { headers });
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  // lấy thông tin user theo username
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`, { headers: this.getHeaders() });
  }

  // lấy thông tin userstats
  getUserStats(username: string): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.apiUrl}/users/${username}/stats`, { headers: this.getHeaders() });
  }
} 