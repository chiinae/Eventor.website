import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isLoggedInSubject.next(true);
        }
      })
    );
  }

  signup(userData: {username: string, email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  logout() {
    // Xóa token
    localStorage.removeItem('token');
    // Cập nhật trạng thái đăng nhập
    this.isLoggedInSubject.next(false);
    // Chuyển về trang chủ
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
} 