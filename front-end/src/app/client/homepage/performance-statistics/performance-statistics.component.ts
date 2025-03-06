import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-performance-statistics',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './performance-statistics.component.html',
  styleUrl: './performance-statistics.component.css'
})
export class PerformanceStatisticsComponent {
  totalEvents: number = 2;
  totalParticipants: number = 145;
  totalRevenue: number = 15350000;

  barChartData = [
    { name: 'Category 1', value: 5000000 },
    { name: 'Category 2', value: 3000000 },
    { name: 'Category 3', value: 2000000 },
    { name: 'Category 4', value: 1500000 },
  ];

  lineChartData = [
    { name: 'Ngày 1', value: 5000000 },
    { name: 'Ngày 2', value: 3000000 },
    { name: 'Ngày 3', value: 2000000 },
    { name: 'Ngày 4', value: 1000000 },
  ];

  pieChartData = [
    { name: 'Category 1', value: 5000000 },
    { name: 'Category 2', value: 3000000 },
    { name: 'Category 3', value: 2000000 },
  ];
}
