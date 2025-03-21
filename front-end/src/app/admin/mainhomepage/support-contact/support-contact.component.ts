import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-support-contact',
  imports: [FormsModule, CommonModule],
  templateUrl: './support-contact.component.html',
  styleUrl: './support-contact.component.css'
})
export class SupportContactComponent {
  contacts = [
    { name: 'Huỳnh Thanh H', avatar: 'assets/images/support-contact-admin/ThanhH.png', lastMessage: 'Dạ, admin cho em...', time: 'Hôm nay, 8:32', unread: 1 },
    { name: 'Mai Quốc K', avatar: 'assets/images/support-contact-admin/QuocK.png', lastMessage: 'Cảm ơn admin đã t...', time: 'Hôm nay, 7:25', unread: 1 },
    { name: 'Vũ Thị Thùy L', avatar: 'assets/images/support-contact-admin/ThuyL.png', lastMessage: 'Em mới đăng ký sự...', time: 'Hôm nay, 6:19', unread: 1 },
    { name: 'Tô Thành M', avatar: 'assets/images/support-contact-admin/ThanhM.png', lastMessage: 'Sự kiện này có tổ ch...', time: 'Thứ 5, 23:42', unread: 5 },
    { name: 'Phạm Thủy N', avatar: 'assets/images/support-contact-admin/ThuyN.png', lastMessage: 'Ad ơi, cho em hỏi là...', time: 'Thứ 5, 22:16', unread: 1 },
    { name: 'Mai Quốc K', avatar: 'assets/images/support-contact-admin/QuocK1.png', lastMessage: 'Cảm ơn admin đã t...', time: 'Thứ 5, 22:54', unread: 1 },
    { name: 'Nguyễn Kiều O', avatar: 'assets/images/support-contact-admin/KieuO.png', lastMessage: 'Ad ơi, cho em hỏi là...', time: 'Thứ 5, 22:16', unread: 1 },
    { name: 'Phạm Thủy N', avatar: 'assets/images/support-contact-admin/ThuyN.png', lastMessage: 'Ad ơi, cho em hỏi là...', time: 'Thứ 5, 22:16', unread: 1 },
  ];

  selectedContact: any = null;
  messages: any[] = [];
  newMessage: string = '';

  selectContact(contact: any) {
    this.selectedContact = contact;
    this.messages = [
      { sender: 'user', text: 'Chào admin ạ' },
      { sender: 'user', text: 'Ad có thể cho em hỏi được không ạ?' },
      { sender: 'admin', text: 'Chào bạn!' },
      { sender: 'admin', text: 'Chào bạn, cảm ơn bạn đã liên hệ. Không biết là bạn đang có thắc mắc gì cần Admin giải quyết nhỉ? ' },
      { sender: 'user', text: 'Dạ, admin cho em hỏi là không biết là buổi hòa nhạc gây quỹ Đông Ấm được tổ chức ở TP Hồ Chí Minh vào ngày 25/02 năm nay có tổ chức bán vé offline không ạ?' },

    ];
  }
  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ sender: 'admin', text: this.newMessage });
      this.newMessage = '';
      setTimeout(() => {
        // this.messages.push({ sender: 'admin', text: 'Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm.' });
      }, 1000);
    }
  }
}
