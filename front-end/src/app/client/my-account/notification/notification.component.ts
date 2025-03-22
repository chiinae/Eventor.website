import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface PointHistory {
  id: string;
  date: Date;
  points: number;
  description: string;
  type: 'earn' | 'use';
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  pointHistory: PointHistory[] = [];
  totalPoints = 0;
  isLoading = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPointHistory();
  }

  private loadPointHistory() {
    // Simulate loading data
    setTimeout(() => {
      this.pointHistory = [
        {
          id: '1',
          date: new Date('2024-03-15'),
          points: 100,
          description: 'Điểm thưởng từ việc tạo sự kiện',
          type: 'earn'
        },
        {
          id: '3',
          date: new Date('2024-03-13'),
          points: 200,
          description: 'Điểm thưởng từ việc tham gia sự kiện',
          type: 'earn'
        }
      ];
      
      // Calculate total points
      this.totalPoints = this.pointHistory.reduce((total, item) => {
        return total + (item.type === 'earn' ? item.points : -item.points);
      }, 0);
      
      this.isLoading = false;
    }, 1000);
  }
} 