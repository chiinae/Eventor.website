import { Component } from '@angular/core';
import { BrandStoryComponent } from './brand-story/brand-story.component';
import { BlogComponent } from './blog/blog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MemberRegisterComponent } from './member-register/member-register.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentFeeComponent } from './payment-fee/payment-fee.component';
import { PaymentFreeComponent } from './payment-free/payment-free.component';
import { PerformanceStatisticsComponent } from './performance-statistics/performance-statistics.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [BrandStoryComponent,HeaderComponent,FooterComponent, RouterModule, BlogComponent,HiringComponent, CreateEventComponent, MemberRegisterComponent, PaymentComponent, PaymentFeeComponent, PaymentFreeComponent, PerformanceStatisticsComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
