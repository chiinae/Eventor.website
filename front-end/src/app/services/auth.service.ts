import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();
  private sessionTimeKey = 'session_start_time';
  private sessionDuration = 3600000; // 1 hour in milliseconds

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.checkInitialAuthStatus();
  }

  private checkInitialAuthStatus() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.isLoggedInSubject.next(true);
      this.loadUserData();
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  signup(userData: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.apiUrl}/register`, userData, { headers }).pipe(
      tap((response: any) => {
        if (response && response.success) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem(this.sessionTimeKey, Date.now().toString());
          this.isLoggedInSubject.next(true);
          this.loadUserData();
        }
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = {
      email: email,
      password: password
    };

    console.log('Sending login request:', body);

    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        if (response && response.success) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem(this.sessionTimeKey, Date.now().toString());
          this.isLoggedInSubject.next(true);
          this.loadUserData();
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        this.isLoggedInSubject.next(false);
        localStorage.removeItem('auth_token');
        return throwError(() => error);
      })
    );
  }

  private loadUserData() {
    const userId = this.getUserIdFromToken();
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response) => {
          if (response.success && response.user) {
            console.log('User loaded successfully:', response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          } else {
            console.error('Failed to load user data:', response.message);
            this.logout();
          }
        },
        error: (error) => {
          console.error('Error loading user data:', error);
          this.logout();
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem(this.sessionTimeKey);
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn$;
  }

  refreshSession(): void {
    const sessionStart = localStorage.getItem(this.sessionTimeKey);
    const token = localStorage.getItem('auth_token');
    
    if (!token || !sessionStart) {
      this.logout();
      return;
    }

    const sessionAge = Date.now() - parseInt(sessionStart);
    if (sessionAge > this.sessionDuration) {
      this.logout();
      return;
    }

    // Cập nhật thời gian session
    localStorage.setItem(this.sessionTimeKey, Date.now().toString());
  }
}