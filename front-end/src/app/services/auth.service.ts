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
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.isLoggedInSubject.next(true);
        }
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

  updateUserInfo(userId: string, userData: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/${userId}`, 
      userData,
      { headers: this.getHeaders() }
    ).pipe(
      tap((response: any) => {
        if (response.user) {
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          const updatedUser = { ...currentUser, ...response.user };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      })
    );
  }
} 