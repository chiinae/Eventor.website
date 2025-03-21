import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentmanageComponent } from './paymentmanage.component';

describe('PaymentmanageComponent', () => {
  let component: PaymentmanageComponent;
  let fixture: ComponentFixture<PaymentmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentmanageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
