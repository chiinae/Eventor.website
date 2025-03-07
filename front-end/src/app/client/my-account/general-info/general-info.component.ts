import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  user = {
    avatarUrl: '../../../../assets/images/user-avatar.png',
    name: 'Nguyễn Minh Anh',
    registrationDate: '11/05/2025'
  };

  navigateTo(route: string) {
    this.router.navigate(['/my-account', route]);
  }

  logout() {
    this.authService.logout(); // Sẽ tự động chuyển về homepage
  }

  backToHome() {
    this.router.navigate(['/homepage']);
  }
}
