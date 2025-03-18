import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageoverallComponent } from './manageoverall.component';

describe('ManageoverallComponent', () => {
  let component: ManageoverallComponent;
  let fixture: ComponentFixture<ManageoverallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageoverallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageoverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
