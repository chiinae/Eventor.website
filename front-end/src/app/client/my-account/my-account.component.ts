import { Component, ViewEncapsulation } from '@angular/core';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports: [SavedEventsComponent,GeneralInfoComponent,InvoicesComponent, NgClass],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
  encapsulation: ViewEncapsulation.None
})
export class MyAccountComponent {
  activeTab: string = 'general';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
