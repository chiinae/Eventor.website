import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contentmanage',
  imports: [CommonModule, RouterModule],
  templateUrl: './contentmanage.component.html',
  styleUrl: './contentmanage.component.css'
})
export class ContentmanageComponent {
  mainContent = {
    title: "Bí quyết tìm tài trợ cho sự kiện",
    author: "Lê Kiều C",
    mainImage: "assets/images/contentmanage/mainevent.png",
    items: [
      { title: "Bí quyết tìm tài trợ cho sự kiện", author: "Lê Kiều C", image: "assets/images/contentmanage/event1.png" },
      { title: "Bí quyết tìm tài trợ cho sự kiện", author: "Lê Kiều C", image: "assets/images/contentmanage/event1.png" },
      { title: "Bí quyết tìm tài trợ cho sự kiện", author: "Lê Kiều C", image: "assets/images/contentmanage/event1.png" }
    ]
  };

  latestContents = [
    { title: "5 bước để làm chủ mọi cuộc họp một cách hiệu quả", author: "Lê Kiều C" },
    { title: "5 bước để làm chủ mọi cuộc họp một cách hiệu quả", author: "Lê Kiều C" },
    { title: "5 bước để làm chủ mọi cuộc họp một cách hiệu quả", author: "Lê Kiều C" },
    { title: "5 bước để làm chủ mọi cuộc họp một cách hiệu quả", author: "Lê Kiều C" },
    { title: "5 bước để làm chủ mọi cuộc họp một cách hiệu quả", author: "Lê Kiều C" }
  ];

  editContent(item: any) {
    console.log("Chỉnh sửa:", item);
  }

  deleteContent(item: any) {
    console.log("Xóa:", item);
  }
}
