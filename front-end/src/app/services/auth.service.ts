import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private isLoggedInSubject: BehaviorSubject<boolean>;
  public isLoggedIn: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
    this.isLoggedIn = this.isLoggedInSubject.asObservable();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response);
        if (!response) {
          console.error('No response from server');
          throw new Error('No response from server');
        }

        if (!response.success) {
          console.error('Login failed:', response.message);
          throw new Error(response.message || 'Login failed');
        }

        if (!response.token) {
          console.error('No token in response');
          throw new Error('No token in response');
        }

        localStorage.setItem('token', response.token);
        if (response.user) {
          console.log('Saving user to localStorage:', response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.isLoggedInSubject.next(true);
      }),
      switchMap(() => {
        console.log('Loading current user after login...');
        return this.userService.loadCurrentUser();
      }),
      tap(user => {
        console.log('User loaded after login:', user);
        if (user) {
          this.router.navigate(['/homepage']);
        } else {
          console.error('Failed to load user after login');
          this.logout();
          throw new Error('Failed to load user data');
        }
      })
    );
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }

  getLoginStatus(): Observable<boolean> {
    return this.isLoggedIn;
  }

  getCurrentLoginStatus(): boolean {
    return this.isLoggedInSubject.value;
  }
} 