import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleComponentComponent } from './add-article-component.component';

describe('AddArticleComponentComponent', () => {
  let component: AddArticleComponentComponent;
  let fixture: ComponentFixture<AddArticleComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
