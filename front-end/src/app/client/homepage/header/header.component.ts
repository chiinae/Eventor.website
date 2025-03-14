import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  navigateTo(route: string): void {
    switch(route) {
      case 'my-events':
        this.router.navigate(['/homepage/my-events']);
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
      case 'my-account':
        this.router.navigate(['/my-account']);
        break;
      default:
        this.router.navigate(['/homepage']);
    }
  }
}