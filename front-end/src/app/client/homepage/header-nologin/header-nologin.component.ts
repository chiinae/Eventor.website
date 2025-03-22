import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-nologin',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-nologin.component.html',
  styleUrls: ['./header-nologin.component.css']
})
export class HeaderNologinComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.classList.toggle('active');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMenuOpen = false;
  }

  handleNavigation(route: string) {
    const authRequiredRoutes = [
      'homepage/create-event',
      'homepage/my-events',
      'homepage/member-registration',
      'homepage/listevents',
    ];

    if (authRequiredRoutes.includes(route)) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate([route]);
    }
    this.isMenuOpen = false;
  }

  login() {
    this.router.navigate(['/login']);
    this.isMenuOpen = false;
  }

  clearSearch() {
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
      searchInput.focus();
    }
  }
}
