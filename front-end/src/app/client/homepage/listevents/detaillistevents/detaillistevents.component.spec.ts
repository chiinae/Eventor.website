import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaillisteventsComponent } from './detaillistevents.component';

describe('DetaillisteventsComponent', () => {
  let component: DetaillisteventsComponent;
  let fixture: ComponentFixture<DetaillisteventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetaillisteventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetaillisteventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
