import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailHiringComponent } from './detail-hiring/detail-hiring.component';
import { ApplyFormComponent } from './apply-form/apply-form.component';

@Component({
  selector: 'app-hiring',
  standalone: true,
  imports: [CommonModule, DetailHiringComponent, ApplyFormComponent],
  templateUrl: './hiring.component.html',
  styleUrl: './hiring.component.css',
})
export class HiringComponent {
  selectedJob: any = null;
  isApplying: boolean = false; // ✅ Biến kiểm soát hiển thị form ứng tuyển

  jobs = [
    { id: 1, title: "[Junior] Web Developer", location: "TP Hồ Chí Minh", image: "../../../../assets/images/hiring/hiring_2.jpg" },
    { id: 2, title: "[Senior] Kế toán", location: "TP Hồ Chí Minh", image: "../../../../assets/images/hiring/hiring_3.png" },
    { id: 3, title: "Nhân viên chăm sóc khách hàng", location: "TP Hồ Chí Minh", image: "../../../../assets/images/hiring/hiring_4.jpg" }
  ];

  selectJob(job: any) {
    this.selectedJob = {
      level: 'Senior',
      title: 'Kế toán',
      deadline: '14/04/2025',
      location: '72A Lê Thánh Tôn, Quận 1, TP.HCM',
      workingTime: 'T2-T6 (7h - 17h)',
      tasks: [
        'Triển khai, tư vấn và hỗ trợ khách hàng.',
        'Giao dịch nhận chứng từ, hóa đơn.',
        'Kiểm soát số liệu, giải trình thuế.'
      ],
      requirements: [
        'Tốt nghiệp ngành liên quan.',
        'Kinh nghiệm ít nhất 2 năm.',
        'Thành thạo phần mềm kế toán.'
      ],
      benefits: [
        'Mức lương hấp dẫn.',
        'Chế độ bảo hiểm đầy đủ.',
        'Môi trường làm việc chuyên nghiệp.'
      ]
    };
  }

  closeDetail() {
    this.selectedJob = null;
  }

  openApplyForm() {
    console.log("Mở form ứng tuyển!"); // ✅ Kiểm tra xem có gọi hàm không
    this.isApplying = true;
  }

  closeApplyForm() {
    console.log("Đóng form ứng tuyển!"); // ✅ Kiểm tra xem có gọi hàm không
    this.isApplying = false;
  }
}
