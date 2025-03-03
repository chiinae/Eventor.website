import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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


export const routes: Routes = [
  { path: 'forgot-password', component: ForgotPasswordComponent,},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Mặc định về trang login

  { path: 'my-account', 
    component: MyAccountComponent,
    children: [
      { path: 'general-info', component: GeneralInfoComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'saved-events', component: SavedEventsComponent },
      { path: '', redirectTo: 'general-info', pathMatch: 'full' } // Mặc định vào "Thông tin chung"
    ]
  }, 
  { 
    path: 'homepage', 
    component: HomepageComponent, // Homepage chứa Header & Footer
    children: [
      { path: 'brand-story', component: BrandStoryComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'hiring', component: HiringComponent },
      { path: '', redirectTo: 'brand-story', pathMatch: 'full' } // Mặc định vào Brand Story
    ]
  },
  { path: '', redirectTo: 'my-account/general-info', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
