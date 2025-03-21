import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError, of } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { distinctUntilChanged, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable().pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );
  currentUser$ = this.currentUserSubject.asObservable().pipe(
    distinctUntilChanged((prev, curr) => 
      JSON.stringify(prev) === JSON.stringify(curr)
    ),
    shareReplay(1)
  );
  private sessionTimeKey = 'session_start_time';
  private sessionDuration = 3600000; // 1 hour in milliseconds
  private lastTokenCheck: number = 0;
  private checkInterval: number = 5000; // 5 seconds

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
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          this.currentUserSubject.next(user);
        } catch (error) {
          this.logout();
        }
      }
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser$;
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
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
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
            this.userService.loadCurrentUser().subscribe();
          }
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = { email, password };

    return this.http.post(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap((response: any) => {
        if (response && response.success) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem(this.sessionTimeKey, Date.now().toString());
          this.isLoggedInSubject.next(true);
          if (response.user) {
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
            this.userService.loadCurrentUser().subscribe();
          }
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      catchError((error) => {
        this.isLoggedInSubject.next(false);
        localStorage.removeItem('auth_token');
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  refreshSession(): void {
    const now = Date.now();
    if (now - this.lastTokenCheck < this.checkInterval) {
      return;
    }
    this.lastTokenCheck = now;

    const currentTime = Date.now();
    const sessionStartTime = Number(localStorage.getItem(this.sessionTimeKey)) || 0;
    
    if (currentTime - sessionStartTime > this.sessionDuration) {
      localStorage.setItem(this.sessionTimeKey, currentTime.toString());
      this.refreshToken().subscribe();
    }
  }

  private refreshToken(): Observable<any> {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      return throwError(() => new Error('No token found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/refresh-token`, {}, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      }),
      shareReplay(1)
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem(this.sessionTimeKey);
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    this.userService.clearUser();
    this.router.navigate(['/homepage']);
  }

  private getUserIdFromToken(): string | null {
    const token = localStorage.getItem('auth_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (error) {
      return null;
    }
  }
}