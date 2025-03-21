import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HiringComponent } from './hiring/hiring.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MemberRegisterComponent } from './member-register/member-register.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentFeeComponent } from './payment-fee/payment-fee.component';
import { PaymentFreeComponent } from './payment-free/payment-free.component';
import { CommonModule } from '@angular/common';
import { HeaderNologinComponent } from './header-nologin/header-nologin.component';
import { AuthService } from '../../services/auth.service';
import { HeaderService } from '../../services/header.service';
import { UserService } from '../../services/user.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user.interface';

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
  ],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    public headerService: HeaderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Kiểm tra trạng thái đăng nhập ban đầu
    this.isLoggedIn = this.authService.getCurrentLoginStatus();
    
    // Theo dõi trạng thái đăng nhập và thông tin user
    this.authService.isLoggedIn$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
        
        if (!loggedIn) {
          this.currentUser = null;
        }
      });

    // Theo dõi thông tin user độc lập
    this.userService.currentUser
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.currentUser = user;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
