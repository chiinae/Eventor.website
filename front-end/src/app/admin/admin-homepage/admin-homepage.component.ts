import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { AdminSidebarComponent } from '../admin-sidebar/admin-sidebar.component';
import { AdminDashboardCardsComponent } from '../admin-dashboard-cards/admin-dashboard-cards.component';
import { AdminContentComponent } from '../admin-content/admin-content.component';
import { AdminFooterComponent } from '../admin-footer/admin-footer.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
@Component({
  selector: 'app-admin-homepage',
  imports: [AdminHeaderComponent, AdminSidebarComponent, AdminDashboardCardsComponent, AdminContentComponent, AdminFooterComponent, RouterModule, AdminDashboardComponent],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent {

}
