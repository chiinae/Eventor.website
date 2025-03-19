import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.getCurrentLoginStatus()) {
      this.router.navigate(['/login']);
      return;
    }

    this.userService.currentUser.subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
          this.authService.refreshSession();
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin user:', error);
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  navigateTo(route: string) {
    this.authService.refreshSession();
    
    switch(route) {
      case 'general-info':
        this.router.navigate(['/my-account/general-info']);
        break;
      case 'invoices':
        this.router.navigate(['/my-account/invoices']);
        break;
      case 'statistics':
        this.router.navigate(['/my-account/statistics']);
        break;
      case 'saved-events':
        this.router.navigate(['/my-account/saved-events']);
        break;
      default:
        this.router.navigate(['/my-account']);
    }
  }

  logout(): void {
    this.authService.logout();
  }

  getDisplayName(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.first_name} ${this.currentUser.last_name}`;
  }

  formatDate(date: Date | string | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('vi-VN');
  }
}

