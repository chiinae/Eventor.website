import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralInfoComponent } from '../general-info/general-info.component';
import { SavedEventsComponent } from '../saved-events/saved-events.component';
@Component({
  selector: 'app-invoices',
  standalone: true,
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  constructor(private router: Router) {}

  navigateTo(tab: string) {
    this.router.navigate(['/my-account', tab]);
  }

  logout() {
    console.log('Đăng xuất...');
  } 
}
