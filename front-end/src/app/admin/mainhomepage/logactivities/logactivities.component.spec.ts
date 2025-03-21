import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogactivitiesComponent } from './logactivities.component';

describe('LogactivitiesComponent', () => {
  let component: LogactivitiesComponent;
  let fixture: ComponentFixture<LogactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogactivitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
