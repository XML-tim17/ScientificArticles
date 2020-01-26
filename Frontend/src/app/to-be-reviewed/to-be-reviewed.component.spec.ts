import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToBeReviewedComponent } from './to-be-reviewed.component';

describe('ToBeReviewedComponent', () => {
  let component: ToBeReviewedComponent;
  let fixture: ComponentFixture<ToBeReviewedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToBeReviewedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToBeReviewedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
