import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateTo(route: string): void {
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
      case 'notifications':
        this.router.navigate(['/my-account/notifications']);
        break;
      case 'my-events':
        this.router.navigate(['/my-account/my-events']);
        break;
      case 'create-event':
        this.router.navigate(['/homepage/create-event']);
        break;
      case 'event-information':
        this.router.navigate(['/homepage/event-information']);
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
  }
}