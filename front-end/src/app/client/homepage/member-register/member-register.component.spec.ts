import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegisterComponent } from './member-register.component';

describe('MemberRegisterComponent', () => {
  let component: MemberRegisterComponent;
  let fixture: ComponentFixture<MemberRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
