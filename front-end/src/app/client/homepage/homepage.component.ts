import { Component, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { HeaderNologinComponent } from './header-nologin/header-nologin.component';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent,
    HeaderNologinComponent,
    FooterComponent,
    BrandStoryComponent,
    BlogComponent,
    HiringComponent,
    CreateEventComponent,
    MemberRegisterComponent,
    PaymentComponent,
    PaymentFeeComponent,
    PaymentFreeComponent,
    PerformanceStatisticsComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    public headerService: HeaderService
  ) {}

  ngOnInit() {
    // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
    this.isLoggedIn = this.authService.isLoggedIn();
    
    // Theo dõi thay đổi trạng thái đăng nhập
    this.authService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn;
      }
    );
  }
}
