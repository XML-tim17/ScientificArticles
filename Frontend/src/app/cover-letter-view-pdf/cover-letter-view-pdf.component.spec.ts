import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverLetterViewPdfComponent } from './cover-letter-view-pdf.component';

describe('CoverLetterViewPdfComponent', () => {
  let component: CoverLetterViewPdfComponent;
  let fixture: ComponentFixture<CoverLetterViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverLetterViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverLetterViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
