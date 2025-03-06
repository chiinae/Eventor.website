import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHiringComponent } from './detail-hiring.component';

describe('DetailHiringComponent', () => {
  let component: DetailHiringComponent;
  let fixture: ComponentFixture<DetailHiringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailHiringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailHiringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
