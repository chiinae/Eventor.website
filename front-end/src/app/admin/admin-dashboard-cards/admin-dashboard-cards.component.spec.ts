import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCardsComponent } from './admin-dashboard-cards.component';

describe('AdminDashboardCardsComponent', () => {
  let component: AdminDashboardCardsComponent;
  let fixture: ComponentFixture<AdminDashboardCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
