import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Kiểm tra token khi khởi động
    const token = localStorage.getItem('token');
    this.isLoggedInSubject.next(!!token);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    console.log('=== Starting login ===');
    console.log('Login attempt:', credentials.email);
    
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Raw login response:', response);
        
        if (!response) {
          console.error('Response is null or undefined');
          throw new Error('Không nhận được phản hồi từ server');
        }

        // Kiểm tra response có success, token và user
        if (!response.success || !response.token || !response.user) {
          console.error('Invalid login response:', {
            success: response.success,
            hasToken: !!response.token,
            hasUser: !!response.user
          });
          throw new Error('Phản hồi không hợp lệ từ server');
        }

        // Log thông tin user
        console.log('User data from server:', {
          _id: response.user._id,
          email: response.user.email,
          username: response.user.username
        });

        // Lưu token
        localStorage.setItem('token', response.token);
        
        // Lưu user data
        const userData = {
          ...response.user,
          _id: response.user._id // Đảm bảo _id được lưu đúng
        };

        console.log('Saving user data to localStorage:', userData);
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Verify saved data
        const savedUser = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('Verified saved user data:', savedUser);
        
        this.isLoggedInSubject.next(true);
      })
    );
  }

  signup(userData: {username: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/homepage']);
  }

  navigateWithAuth(route: string[]) {
    if (this.isLoggedIn()) {
      this.router.navigate(route);
    } else {
      // Lưu URL đích để sau khi đăng nhập sẽ redirect về đó
      localStorage.setItem('redirectUrl', route.join('/'));
      this.router.navigate(['/login']);
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  updateUserInfo(_id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${_id}`, data);
  }
} 