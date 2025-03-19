import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  totalEvents: number = 2;
  totalParticipants: number = 145;
  totalRevenue: number = 15350000;
  lineChart: any;
  pieChart: any;
  selectedDateRange: string = '';
  selectedEventId: string = '';

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 10;
  pages: number[] = [];

  constructor() {
    this.generatePagesArray();
  }

  ngOnInit() {
    this.initializeCharts();
  }

  generatePagesArray() {
    this.pages = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.generatePagesArray();
      // Thực hiện load dữ liệu cho trang mới
      this.loadPageData();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  loadPageData() {
    // TODO: Implement API call to load data for current page
    console.log('Loading data for page:', this.currentPage);
  }

  initializeCharts() {
    // Line Chart
    const lineCtx = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.lineChart = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        datasets: [
          {
            label: 'Doanh thu',
            data: [3000000, 4500000, 2800000, 5100000, 3800000, 4200000, 5350000],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Doanh thu theo ngày'
          }
        }
      }
    });

    // Pie Chart
    const pieCtx = document.getElementById('eventDistributionChart') as HTMLCanvasElement;
    this.pieChart = new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: ['Sự kiện A', 'Sự kiện B', 'Sự kiện C', 'Sự kiện D', 'Sự kiện E'],
        datasets: [{
          data: [50000, 25000, 15000, 7000, 3000],
          backgroundColor: [
            '#FF6384', // Hồng đậm
            '#36A2EB', // Xanh dương
            '#FFCE56', // Vàng
            '#4BC0C0', // Xanh ngọc
            '#9966FF', // Tím
          ],
          borderColor: [
            '#FF4D6D',
            '#2E8BC0',
            '#FFB73A',
            '#3DA8A8',
            '#7F4DFF'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tỉ lệ doanh thu trên sự kiện'
          },
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  onExportData() {
    // TODO: Implement export functionality
    console.log('Exporting data...');
    // Có thể thêm logic xuất dữ liệu ra file Excel hoặc PDF ở đây
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  onDateRangeChange() {
    // Xử lý khi thay đổi khoảng thời gian
    console.log('Date range changed:', this.selectedDateRange);
  }

  onEventChange() {
    // Xử lý khi thay đổi sự kiện
    console.log('Event changed:', this.selectedEventId);
  }
} 