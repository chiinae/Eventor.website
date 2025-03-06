import { Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { MyAccountComponent } from './client/my-account/my-account.component';
import { InvoicesComponent } from './client/my-account/invoices/invoices.component';
import { GeneralInfoComponent } from './client/my-account/general-info/general-info.component';
import { SavedEventsComponent } from './client/my-account/saved-events/saved-events.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { BrandStoryComponent } from './client/homepage/brand-story/brand-story.component';
import { BlogComponent } from './client/homepage/blog/blog.component';
import { HiringComponent } from './client/homepage/hiring/hiring.component';
import { DetailComponent } from './client/homepage/blog/detail/detail.component';
import { AfterLoginComponent} from './client/homepage/after-login/after-login.component';
import { MyEventsComponent } from './client/homepage/my-events/my-events.component';
import { CreateEventComponent } from './client/homepage/create-event/create-event.component';
import { EventInformationComponent} from './client/homepage/event-information/event-information.component';
import { MemberRegisterComponent } from './client/homepage/member-register/member-register.component';
import { PaymentComponent } from './client/homepage/payment/payment.component';
import { PaymentFeeComponent } from './client/homepage/payment-fee/payment-fee.component';
import { PaymentFreeComponent } from './client/homepage/payment-free/payment-free.component';
import { PerformanceStatisticsComponent } from './client/homepage/performance-statistics/performance-statistics.component';

export const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-events', component: MyEventsComponent },
  { 
    path: 'my-account', 
    component: MyAccountComponent,
    children: [
      { path: 'general-info', component: GeneralInfoComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'saved-events', component: SavedEventsComponent },
      { path: '', redirectTo: 'general-info', pathMatch: 'full' }
    ]
  }, 
  { 
    path: 'homepage', 
    component: HomepageComponent,
    children: [
      { path: 'after-login', component: AfterLoginComponent },
      { path: 'brand-story', component: BrandStoryComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/detail', component: DetailComponent },
      { path: 'hiring', component: HiringComponent },
      { path: 'my-events', component: MyEventsComponent },
      { path: 'create-event', component: CreateEventComponent },
      { path: 'event-information', component: EventInformationComponent },
      { path: 'member-registration', component: MemberRegisterComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'payment-fee', component: PaymentFeeComponent },
      { path: 'payment-free', component: PaymentFreeComponent },
      { path: 'performance-statistics', component: PerformanceStatisticsComponent },
      { path: '', redirectTo: 'after-login', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Single default route
];
