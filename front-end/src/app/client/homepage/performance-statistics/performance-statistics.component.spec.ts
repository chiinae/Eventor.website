import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceStatisticsComponent } from './performance-statistics.component';

describe('PerformanceStatisticsComponent', () => {
  let component: PerformanceStatisticsComponent;
  let fixture: ComponentFixture<PerformanceStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceStatisticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
