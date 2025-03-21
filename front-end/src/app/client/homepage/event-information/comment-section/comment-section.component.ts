import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Comment {
  username: string;
  avatar: string;
  time: string;
  text: string;
}

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() eventId: string | null = null;
  
  newComment: string = '';
  comments: Comment[] = [
    {
      username: 'Nguyễn Minh Anh',
      avatar: 'assets/images/user-avatar.png',
      time: '23:00 11/03/2025',
      text: 'Cho em hỏi vé SVIP sẽ ngồi ở zone nào vậy ạ?'
    }
  ];

  addComment() {
    if (this.newComment.trim()) {
      // Tạo comment mới với thời gian hiện tại
      const now = new Date();
      const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ${now.getDate()}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
      
      const newCommentObj: Comment = {
        username: 'Nguyễn Minh Anh', // Có thể lấy từ user service
        avatar: 'assets/images/user-avatar.png',
        time: timeStr,
        text: this.newComment
      };

      // Thêm comment mới vào đầu mảng
      this.comments.unshift(newCommentObj);
      
      // Reset input
      this.newComment = '';
    }
  }
}
