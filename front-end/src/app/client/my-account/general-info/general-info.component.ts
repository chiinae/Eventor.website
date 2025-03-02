import { Component } from '@angular/core';

@Component({
  selector: 'app-general-info',
  imports: [],
  templateUrl: './general-info.component.html',
  styleUrl: './general-info.component.css'
})
export class GeneralInfoComponent {
  user = {
    avatarUrl: '../../../../assets/images/user-avatar.png',
    name: 'Nguyễn Minh Anh',
    registrationDate: '11/05/2025'
  };
}
