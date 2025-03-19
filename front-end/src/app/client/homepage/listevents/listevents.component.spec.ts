import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEventsComponent } from './listevents.component';
import { EventService, Event } from '../../../services/event.service';
import { of } from 'rxjs';

describe('ListEventsComponent', () => {
  let component: ListEventsComponent;
  let fixture: ComponentFixture<ListEventsComponent>;
  let eventService: jasmine.SpyObj<EventService>;

  const mockEvent: Event = {
    _id: '1',
    id: 'B001',
    event_name: 'Test Event',
    hour_start: '10:00',
    start_date: '2024-03-20',
    location: {
      name: 'Test Location',
      address: 'Test Address',
      city: 'Test City'
    },
    price: 0,
    image: 'test.jpg',
    event_image: 'test.jpg',
    tickets: [],
    description: 'Test Description',
    category_id: 'C001',
    status: 'active',
    max_participant: 100,
    current_participant: 50,
    created_at: '2024-03-19',
    format: 'online',
    organizer_id: 'O001'
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EventService', ['getEventById', 'getAllEvents']);
    spy.getEventById.and.returnValue(of(mockEvent));
    spy.getAllEvents.and.returnValue(of({ total: 1, events: [mockEvent] }));

    await TestBed.configureTestingModule({
      declarations: [ListEventsComponent],
      providers: [{ provide: EventService, useValue: spy }]
    }).compileComponents();

    eventService = TestBed.inject(EventService) as jasmine.SpyObj<EventService>;
    fixture = TestBed.createComponent(ListEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load events on init', () => {
    expect(eventService.getEventById).toHaveBeenCalled();
  });

  it('should handle error when loading events', () => {
    eventService.getEventById.and.returnValue(of(mockEvent));
    component.ngOnInit();
    expect(component.recommendedEvents.length).toBeGreaterThanOrEqual(0);
    expect(component.thisWeekEvents.length).toBeGreaterThanOrEqual(0);
    expect(component.freeEvents.length).toBeGreaterThanOrEqual(0);
  });
});
