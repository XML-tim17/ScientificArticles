import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsViewPdfComponent } from './reviews-view-pdf.component';

describe('ReviewsViewPdfComponent', () => {
  let component: ReviewsViewPdfComponent;
  let fixture: ComponentFixture<ReviewsViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
