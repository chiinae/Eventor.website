import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blog',
  imports: [RouterModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  constructor(private router: Router) {}
  goToDetail() {
    this.router.navigate(['/homepage/blog/detail']);
  }
}
