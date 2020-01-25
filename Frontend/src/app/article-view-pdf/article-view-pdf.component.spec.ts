import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleViewPdfComponent } from './article-view-pdf.component';

describe('ArticleViewPdfComponent', () => {
  let component: ArticleViewPdfComponent;
  let fixture: ComponentFixture<ArticleViewPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleViewPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleViewPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
