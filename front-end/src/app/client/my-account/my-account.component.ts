import { Component, NgModule, ViewEncapsulation } from '@angular/core';
import { SavedEventsComponent } from './saved-events/saved-events.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports:[InvoicesComponent, GeneralInfoComponent, SavedEventsComponent, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css',
  encapsulation: ViewEncapsulation.None
})

export class MyAccountComponent {}

