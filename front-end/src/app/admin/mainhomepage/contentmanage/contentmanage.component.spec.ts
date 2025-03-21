import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentmanageComponent } from './contentmanage.component';

describe('ContentmanageComponent', () => {
  let component: ContentmanageComponent;
  let fixture: ComponentFixture<ContentmanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentmanageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentmanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
