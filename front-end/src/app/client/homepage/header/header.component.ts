import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/user.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentUser$!: Observable<User | null>;

  constructor(
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.userService.getCurrentUser();
  }

  ngOnInit() {
    // Load user data if token exists
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.userService.loadCurrentUser().subscribe({
        next: (user) => {
          console.log('User loaded in header:', user);
        },
        error: (error) => {
          console.error('Error loading user in header:', error);
          this.router.navigate(['/login']);
        }
      });
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.classList.toggle('active');
    }
  }

  navigateTo(route: string): void {
    // Prevent event bubbling
    event?.preventDefault();
    event?.stopPropagation();
    
    try {
      const token = localStorage.getItem('auth_token');
      const authenticatedRoutes = ['my-account', 'general-info', 'invoices', 'statistics', 'notifications', 'my-events'];
      
      if (authenticatedRoutes.includes(route)) {
        if (!token) {
          console.log('No token found, redirecting to login');
          this.router.navigate(['/login']);
          return;
        }

        // Kiểm tra user data từ service
        this.userService.getCurrentUser().subscribe({
          next: (currentUser) => {
            console.log('Current user from service:', currentUser);
            if (!currentUser) {
              console.log('No user data from service, trying to load');
              this.userService.loadCurrentUser().subscribe({
                next: (loadedUser) => {
                  console.log('Loaded user:', loadedUser);
                  if (loadedUser) {
                    this.performNavigation(route);
                  } else {
                    console.log('Still no user data after loading');
                    this.router.navigate(['/login']);
                  }
                },
                error: (error) => {
                  console.error('Error loading user:', error);
                  this.router.navigate(['/login']);
                }
              });
            } else {
              this.performNavigation(route);
            }
          },
          error: (error) => {
            console.error('Error getting current user:', error);
            this.router.navigate(['/login']);
          }
        });
      } else {
        this.performNavigation(route);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
    
    // Close mobile menu after navigation
    this.isMenuOpen = false;
  }

  private performNavigation(route: string): void {
    switch(route) {
      case 'my-account':
      case 'general-info':
        this.router.navigate(['/my-account/general-info']);
        break;
      case 'invoices':
        this.router.navigate(['/my-account/invoices']);
        break;
      case 'statistics':
        this.router.navigate(['/my-account/statistics']);
        break;
      case 'notifications':
        this.router.navigate(['/my-account/notifications']);
        break;
      case 'my-events':
        this.router.navigate(['/homepage/my-events']);
        break;
      case 'create-event':
        this.router.navigate(['/homepage/create-event']);
        break;
      case 'listevents':
        this.router.navigate(['/homepage/listevents']);
        break;
      case 'member-registration':
        this.router.navigate(['/homepage/member-registration']);
        break;
      case 'saved':
        this.router.navigate(['/homepage/saved']);
        break;
      default:
        this.router.navigate(['/homepage']);
    }
  }

  clearSearch() {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
  }

  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}