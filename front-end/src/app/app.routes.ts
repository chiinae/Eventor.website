import { Routes } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { MyAccountComponent } from './client/my-account/my-account.component';
import { InvoicesComponent } from './client/my-account/invoices/invoices.component';
import { GeneralInfoComponent } from './client/my-account/general-info/general-info.component';
import { SavedEventsComponent } from './client/my-account/saved-events/saved-events.component';
import { StatisticsComponent } from './client/my-account/statistics/statistics.component';
import { HomepageComponent } from './client/homepage/homepage.component';
import { BrandStoryComponent } from './client/homepage/brand-story/brand-story.component';
import { BlogComponent } from './client/homepage/blog/blog.component';
import { HiringComponent } from './client/homepage/hiring/hiring.component';
import { DetailComponent } from './client/homepage/blog/detail/detail.component';
import { MainComponent } from './client/homepage/main/main.component';
import { ListEventsComponent } from './client/homepage/listevents/listevents.component';
import { MyEventsComponent } from './client/homepage/my-events/my-events.component';
import { CreateEventComponent } from './client/homepage/create-event/create-event.component';
import { EventInformationComponent } from './client/homepage/event-information/event-information.component';
import { MemberRegisterComponent } from './client/homepage/member-register/member-register.component';
import { PaymentComponent } from './client/homepage/payment/payment.component';
import { PaymentFeeComponent } from './client/homepage/payment-fee/payment-fee.component';
import { PaymentFreeComponent } from './client/homepage/payment-free/payment-free.component';
// Admin add component  
import { MainhomepageComponent } from './admin/mainhomepage/mainhomepage.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { MainheaderComponent } from './admin/mainheader/mainheader.component';
import { ManageoverallComponent } from './admin/mainhomepage/manageoverall/manageoverall.component';
import { AccountmanageComponent } from './admin/mainhomepage/accountmanage/accountmanage.component';
import { EventmanageComponent } from './admin/mainhomepage/eventmanage/eventmanage.component';
import { ContentmanageComponent } from './admin/mainhomepage/contentmanage/contentmanage.component';
import { PaymentmanageComponent } from './admin/mainhomepage/paymentmanage/paymentmanage.component';
import { SupportContactComponent } from './admin/mainhomepage/support-contact/support-contact.component';
import { SettingComponent } from './admin/mainhomepage/setting/setting.component';
import { LogactivitiesComponent } from './admin/mainhomepage/logactivities/logactivities.component';
import { AuthGuard } from './guards/auth.guard';
// import { MatOptgroup } from '@angular/material/core';

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'general-info', pathMatch: 'full' },
      { path: 'general-info', component: GeneralInfoComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'saved-events', component: SavedEventsComponent },
      { path: 'statistics', component: StatisticsComponent }
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
      { path: 'listevents', component: ListEventsComponent, canActivate: [AuthGuard] }
    ]
  },
  // *** Routes cho Admin Panel ***
  { path: 'admin-homepage', component: MainhomepageComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ManageoverallComponent}, // Trang Dashboard chính
      { path: 'header', component: MainheaderComponent, canActivate: [AuthGuard] },
      { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },
      { path: 'manageoverall', component: ManageoverallComponent, canActivate: [AuthGuard] },
      { path: 'accountmanage', component: AccountmanageComponent, canActivate: [AuthGuard] },
      { path: 'eventmanage', component: EventmanageComponent, canActivate: [AuthGuard] },
      { path: 'contentmanage', component: ContentmanageComponent, canActivate: [AuthGuard]},
      { path: 'paymentmanage', component: PaymentmanageComponent, canActivate: [AuthGuard]},
      { path: 'support-contact', component: SupportContactComponent, canActivate: [AuthGuard]},
      { path: 'setting', component: SettingComponent, canActivate: [AuthGuard]},
      { path: 'logactivities', component: LogactivitiesComponent, canActivate: [AuthGuard]},
    ]
  },
  {
    path: 'event/:id',
    component: EventInformationComponent
  }
];
