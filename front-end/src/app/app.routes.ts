import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './client/login/login.component';
import { SignupComponent } from './client/signup/signup.component';
import { ForgotPasswordComponent } from './client/forgot-password/forgot-password.component';
import { MyAccountComponent } from './client/my-account/my-account.component';
import { InvoicesComponent } from './client/my-account/invoices/invoices.component';
import { GeneralInfoComponent } from './client/my-account/general-info/general-info.component';
import { SavedEventsComponent } from './client/my-account/saved-events/saved-events.component';

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
  { path: '', redirectTo: 'my-account/general-info', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes), MyAccountComponent],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
