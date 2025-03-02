import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,LoginComponent,SignupComponent,ForgotPasswordComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  
}
