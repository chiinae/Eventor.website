import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFreeComponent } from './payment-free.component';

describe('PaymentFreeComponent', () => {
  let component: PaymentFreeComponent;
  let fixture: ComponentFixture<PaymentFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
