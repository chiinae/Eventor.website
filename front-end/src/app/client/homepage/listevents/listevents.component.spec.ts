import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventsComponent } from './listevents.component';
import { EventService, Event } from '../../../services/event.service';
import { of } from 'rxjs';  

describe('ListEventsComponent', () => {
  let component: ListEventsComponent;
  let fixture: ComponentFixture<ListEventsComponent>;
  let eventService: jasmine.SpyObj<EventService>;})
