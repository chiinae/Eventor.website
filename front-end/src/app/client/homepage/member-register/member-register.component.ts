import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.css'] // Sửa lại chỗ này
})
export class MemberRegisterComponent {
  constructor(private router: Router) {}
  
    navigateTo(tab: string) {
      this.router.navigate(['/homepage', tab]);
    }
}
