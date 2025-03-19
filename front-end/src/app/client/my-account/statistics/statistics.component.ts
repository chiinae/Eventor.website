import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class StatisticsComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart') revenueChartCanvas!: ElementRef;
  @ViewChild('distributionChart') distributionChartCanvas!: ElementRef;

  // Filters
  searchQuery: string = '';
  startDate: string = '';
  endDate: string = '';

  // Metrics
  revenueMetric: string = 'daily';
  distributionMetric: string = 'revenue';

  // Statistics
  totalEvents: number = 2;
  totalParticipants: number = 145;
  totalRevenue: number = 15350000;

  // Charts
  revenueChart: Chart | null = null;
  distributionChart: Chart | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize dates
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    
    this.startDate = thirtyDaysAgo.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  ngAfterViewInit(): void {
    this.initializeRevenueChart();
    this.initializeDistributionChart();
  }

  private initializeRevenueChart(): void {
    const ctx = this.revenueChartCanvas.nativeElement.getContext('2d');
    
    this.revenueChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['1/3', '2/3', '3/3', '4/3', '5/3', '6/3', '7/3'],
        datasets: [{
          label: 'Doanh thu',
          data: [1200000, 1900000, 1500000, 2100000, 1800000, 2400000, 2000000],
          borderColor: '#8B4513',
          tension: 0.4,
          fill: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value.toLocaleString('vi-VN') + 'đ';
              }
            }
          }
        }
      }
    });
  }

  private initializeDistributionChart(): void {
    const ctx = this.distributionChartCanvas.nativeElement.getContext('2d');
    
    this.distributionChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        datasets: [{
          data: [50000, 25000, 15000, 7000, 3000],
          backgroundColor: [
            '#4B89DC',
            '#FF7F7F',
            '#8CC152',
            '#F6BB42',
            '#967ADC'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          }
        }
      }
    });
  }

  exportData(): void {
    // Implement export functionality
    console.log('Exporting data...');
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
} 