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
      case 'main':
        this.router.navigate(['/homepage/main']);
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
      case 'my-account':
        this.router.navigate(['/my-account']);
        break;
      default:
        this.router.navigate(['/homepage']);
    }
  }

  isRouteActive(route: string): boolean {
    const currentUrl = this.router.url;
    switch(route) {
      case 'my-events':
        return currentUrl.includes('/homepage/my-events');
      case 'create-event':
        return currentUrl.includes('/homepage/create-event');
      case 'listevents':
        return currentUrl.includes('/homepage/listevents');
      case 'member-registration':
        return currentUrl.includes('/homepage/member-registration');
      case 'saved':
        return currentUrl.includes('/homepage/saved');
      case 'my-account':
        return currentUrl.includes('/my-account');
      default:
        return false;
    }
  }
}