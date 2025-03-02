import { Component } from '@angular/core';
import { InvoicesComponent } from '../invoices/invoices.component';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-events',
  standalone: true,
  templateUrl: './saved-events.component.html',
  styleUrl: './saved-events.component.css'
})
export class SavedEventsComponent {
    constructor(private router: Router) {}
  
    navigateTo(tab: string) {
      this.router.navigate(['/my-account', tab]);
    }
  
    logout() {
      console.log('Đăng xuất...');
    } 
}
