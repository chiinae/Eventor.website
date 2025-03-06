import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Job {
  level: string;
  title: string;
  deadline: string;
  location: string;
  workingTime: string;
  tasks: string[];
  requirements: string[];
  benefits: string[];
}

@Component({
  selector: 'app-detail-hiring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-hiring.component.html',
  styleUrls: ['./detail-hiring.component.css'],
})
export class DetailHiringComponent {
  @Input() job: Job = {
    level: '',
    title: '',
    deadline: '',
    location: '',
    workingTime: '',
    tasks: [],
    requirements: [],
    benefits: []
  };

  @Output() close = new EventEmitter<void>();

  closeDetail() {
    this.close.emit();
  }
}
