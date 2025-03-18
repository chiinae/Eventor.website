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
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
