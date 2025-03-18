import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Eventor';
  chatVisible = false;
  userName: string;
  userMessage: string = '';
  messages: string[] = [];

  constructor(private authService: AuthService) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.name || 'Người dùng';
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    console.log('Chat visibility:', this.chatVisible);
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push(this.userMessage);
      console.log('User message:', this.userMessage);
      // Xử lý tin nhắn ở đây
      this.userMessage = '';
    }
  }
}

