import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
    
    // Chỉ load user nếu có token
    if (localStorage.getItem('token')) {
      this.loadCurrentUser().subscribe({
        error: (error) => {
          if (error.status === 403) {
            this.clearUser();
            this.showError('Phiên đăng nhập đã hết hạn');
          }
        }
      });
    }
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
    this.currentUserSubject.next(null);
  }

  loadCurrentUser(): Observable<User | null> {
    console.log('Loading current user...');
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found');
      return of(null);
    }

    const userData = localStorage.getItem('user');
    if (!userData) {
      console.log('No user data found');
      return of(null);
    }

    try {
      const user = JSON.parse(userData);
      console.log('Parsed user data:', user);
      
      if (!user._id) {
        console.log('No user ID found');
        return of(null);
      }

      return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/id/${user._id}`).pipe(
        tap(response => {
          console.log('User API response:', response);
          if (response?.success && response?.user) {
            // Cập nhật thông tin user trong localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          } else {
            console.error('Invalid API response:', response);
          }
        }),
        map(response => {
          if (response?.success && response?.user) {
            return response.user;
          }
          console.error('No user data in response');
          return null;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading user:', error);
          if (error.status === 403) {
            this.clearUser();
          }
          return throwError(() => error);
        })
      );
    } catch (error) {
      console.error('Error parsing user data:', error);
      return of(null);
    }
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser;
  }

  updateCurrentUser(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUserValue;
    if (!currentUser?._id) {
      console.error('Không tìm thấy thông tin user');
      return throwError(() => new Error('Không tìm thấy thông tin user'));
    }

    console.log('Updating user with data:', userData);
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/id/${currentUser._id}`, userData).pipe(
      tap(response => {
        console.log('Update response:', response);
        if (response?.success && response?.user) {
          // Cập nhật thông tin user trong localStorage và subject
          const updatedUser = response.user;
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
      }),
      map(response => {
        if (response?.success && response?.user) {
          return response.user;
        }
        throw new Error('Invalid response format');
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating user:', error);
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
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
      })
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
        console.error('Error updating user:', error);
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
    );
  }

  getUserByEmail(email: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/email/${email}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
    );
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.clearUser();
        }
        return throwError(() => error);
      })
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