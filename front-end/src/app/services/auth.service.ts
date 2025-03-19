import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private tokenKey = 'auth_token';
  private sessionTimeKey = 'session_start_time';
  private sessionDuration = 3600000; // 1 hour in milliseconds
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidSession());

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    if (this.hasValidSession()) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (!response) {
          throw new Error('Không nhận được phản hồi từ server');
        }
        if (response.token) {
          this.setSession(response.token);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.isLoggedInSubject.next(true);
        } else {
          throw new Error('Token không hợp lệ');
        }
      }),
      switchMap(() => {
        return this.userService.loadCurrentUser().pipe(
          catchError(error => {
            console.error('Error loading user:', error);
            return of(null);
          })
        );
      }),
      tap(user => {
        if (user) {
          console.log('User loaded successfully:', user);
        } else {
          console.warn('No user data loaded, but continuing...');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.logout();
        throw error;
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.sessionTimeKey);
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.userService.clearUser();
    this.router.navigate(['/homepage']);
  }

  private setSession(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.sessionTimeKey, Date.now().toString());
  }

  private hasValidSession(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const sessionStart = localStorage.getItem(this.sessionTimeKey);

    if (!token || !sessionStart) {
      return false;
    }

    const sessionAge = Date.now() - parseInt(sessionStart);
    if (sessionAge > this.sessionDuration) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  refreshSession(): void {
    if (this.hasValidSession()) {
      this.setSession(this.getToken()!);
    }
  }
} 