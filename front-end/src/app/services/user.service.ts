import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { User, UserStats, ApiResponse } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private lastUserCheck: number = 0;
  private checkInterval: number = 5000; // 5 seconds

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const userData = localStorage.getItem('user');
    this.currentUserSubject = new BehaviorSubject<User | null>(userData ? JSON.parse(userData) : null);
    this.currentUser = this.currentUserSubject.asObservable().pipe(
      distinctUntilChanged((prev, curr) => 
        JSON.stringify(prev) === JSON.stringify(curr)
      ),
      shareReplay(1)
    );
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  loadCurrentUser(): Observable<User | null> {
    const now = Date.now();
    if (now - this.lastUserCheck < this.checkInterval) {
      // Return cached data if checked recently
      return of(this.currentUserValue);
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      this.clearUser();
      return of(null);
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      return of(null);
    }

    try {
      const user = JSON.parse(userData);
      if (!user._id) {
        this.clearUser();
        return of(null);
      }

      this.lastUserCheck = now;
      return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/id/${user._id}`).pipe(
        map(response => {
          if (response?.success && response?.user) {
            const updatedUser = response.user;
            if (JSON.stringify(updatedUser) !== JSON.stringify(this.currentUserValue)) {
              localStorage.setItem('user', JSON.stringify(updatedUser));
              this.currentUserSubject.next(updatedUser);
            }
            return updatedUser;
          }
          this.clearUser();
          return null;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.clearUser();
          }
          return throwError(() => error);
        }),
        shareReplay(1)
      );
    } catch (error) {
      this.clearUser();
      return of(null);
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
  }

  updateCurrentUser(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;
    if (!currentUser?._id) {
      return throwError(() => new Error('Không tìm thấy thông tin user'));
    }

    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/id/${currentUser._id}`, userData).pipe(
      map(response => {
        if (response?.success && response?.user) {
          const updatedUser = response.user;
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
          return updatedUser;
        }
        throw new Error('Invalid response format');
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  logout(): void {
    this.clearUser();
  }

  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/id/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  updateUserById(userId: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, userData).pipe(
      tap(response => {
        const currentUser = this.currentUserSubject.value;
        if (currentUser && currentUser._id === userId) {
          this.currentUserSubject.next({ ...currentUser, ...userData });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  getUserByEmail(email: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/email/${email}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      }),
      shareReplay(1)
    );
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
    );
  }

  getUserStats(username: string): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.apiUrl}/users/${username}/stats`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
    );
  }
} 