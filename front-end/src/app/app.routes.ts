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
import { MainComponent } from './client/homepage/main/main.component';
import { MyEventsComponent } from './client/homepage/my-events/my-events.component';
import { CreateEventComponent } from './client/homepage/create-event/create-event.component';
import { EventInformationComponent} from './client/homepage/event-information/event-information.component';
import { MemberRegisterComponent } from './client/homepage/member-register/member-register.component';
import { PaymentComponent } from './client/homepage/payment/payment.component';
import { PaymentFeeComponent } from './client/homepage/payment-fee/payment-fee.component';
import { PaymentFreeComponent } from './client/homepage/payment-free/payment-free.component';
// Admin add component  
import { AdminHomepageComponent } from './admin/admin-homepage/admin-homepage.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminDashboardCardsComponent } from './admin/admin-dashboard-cards/admin-dashboard-cards.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard]},
  { path: 'my-account', component: MyAccountComponent,canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'general-info', pathMatch: 'full' },
      { path: 'general-info', component: GeneralInfoComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'saved-events', component: SavedEventsComponent },
    ]
  },
  { 
    path: 'homepage', 
    component: HomepageComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'brand-story', component: BrandStoryComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/detail', component: DetailComponent },
      { path: 'hiring', component: HiringComponent },
      { path: 'my-events', component: MyEventsComponent, canActivate: [AuthGuard] },
      { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard] },
      { path: 'event-information', component: EventInformationComponent },
      { path: 'member-registration', component: MemberRegisterComponent },
      { path: 'payment', component: PaymentComponent, canActivate: [AuthGuard] },
      { path: 'payment-fee', component: PaymentFeeComponent, canActivate: [AuthGuard] },
      { path: 'payment-free', component: PaymentFreeComponent, canActivate: [AuthGuard] },
    ]
  },
  // *** Routes cho Admin Panel ***
  { path: 'admin-homepage', component: AdminHomepageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: AdminHomepageComponent}, // Trang Dashboard chính
      { path: 'header', component: AdminHeaderComponent },
      { path: 'sidebar', component: AdminSidebarComponent },
      { path: 'dashboard-cards', component: AdminDashboardCardsComponent },
      { path: 'content', component: AdminContentComponent },
      { path: 'footer', component: AdminFooterComponent },
    ]
  },
  // { path: 'admin/login', component: AdminLoginComponent },
];
