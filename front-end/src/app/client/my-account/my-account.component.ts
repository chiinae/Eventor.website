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
    this.userService.currentUser.subscribe({
      next: (user) => {
        this.currentUser = user;
        if (!user) {
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin user:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.includes(route);
  }

  navigateTo(tab: string): void {
    this.router.navigate(['/my-account', tab]);
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

