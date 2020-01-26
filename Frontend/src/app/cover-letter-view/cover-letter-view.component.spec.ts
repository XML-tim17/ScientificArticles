import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverLetterViewComponent } from './cover-letter-view.component';

describe('CoverLetterViewComponent', () => {
  let component: CoverLetterViewComponent;
  let fixture: ComponentFixture<CoverLetterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverLetterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverLetterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
