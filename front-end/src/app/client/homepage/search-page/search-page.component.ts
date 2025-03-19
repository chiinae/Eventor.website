import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService, Event } from '../../../services/event.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  searchQuery: string = '';
  searchResults: Event[] = [];
  isLoading: boolean = true;
  noResults: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      if (this.searchQuery) {
        this.performSearch();
      }
    });
  }

  private performSearch() {
    this.isLoading = true;
    this.noResults = false;
    
    this.eventService.searchEvents(this.searchQuery).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.noResults = results.length === 0;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching events:', error);
        this.isLoading = false;
        this.noResults = true;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
} 