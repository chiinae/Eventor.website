import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: `
    <div style="text-align: center; padding: 20px;">
      <h1>Test Kết Nối Backend</h1>
      <button (click)="testConnection()" class="btn-primary" style="max-width: 200px;">
        Test Kết Nối
      </button>
      <div *ngIf="message" style="margin-top: 20px; padding: 10px; border-radius: 4px;" 
           [style.background-color]="isError ? '#ffebee' : '#e8f5e9'"
           [style.color]="isError ? '#c62828' : '#2e7d32'">
        {{ message }}
      </div>
    </div>
  `
})
export class AppComponent implements OnInit {
  message: string = '';
  isError: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  testConnection() {
    this.apiService.testConnection().subscribe(
      (response) => {
        this.message = response.message;
        this.isError = false;
      },
      (error) => {
        this.message = 'Lỗi kết nối với backend: ' + (error.message || 'Không xác định');
        this.isError = true;
      }
    );
  }
}

