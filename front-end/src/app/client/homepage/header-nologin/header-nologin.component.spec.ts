import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNologinComponent } from './header-nologin.component';

describe('HeaderNologinComponent', () => {
  let component: HeaderNologinComponent;
  let fixture: ComponentFixture<HeaderNologinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderNologinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderNologinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
