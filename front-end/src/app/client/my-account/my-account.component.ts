import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info/general-info.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GeneralInfoComponent
  ],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  navigateTo(route: string) {
    this.router.navigate(['/my-account', route]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === `/my-account/${route}`;
  }

  logout() {
    this.authService.logout();
  }
}

