import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFeeComponent } from './payment-fee.component';

describe('PaymentFeeComponent', () => {
  let component: PaymentFeeComponent;
  let fixture: ComponentFixture<PaymentFeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
