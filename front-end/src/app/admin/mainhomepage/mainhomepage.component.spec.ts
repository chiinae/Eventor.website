import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainhomepageComponent } from './mainhomepage.component';

describe('MainhomepageComponent', () => {
  let component: MainhomepageComponent;
  let fixture: ComponentFixture<MainhomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainhomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainhomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
