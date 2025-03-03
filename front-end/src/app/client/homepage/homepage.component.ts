import { Component } from '@angular/core';
import { BrandStoryComponent } from './brand-story/brand-story.component';
import { BlogComponent } from './blog/blog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BrandStoryComponent,HeaderComponent,FooterComponent, RouterModule, BlogComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
