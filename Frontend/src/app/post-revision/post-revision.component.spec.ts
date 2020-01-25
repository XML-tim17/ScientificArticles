import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRevisionComponent } from './post-revision.component';

describe('PostRevisionComponent', () => {
  let component: PostRevisionComponent;
  let fixture: ComponentFixture<PostRevisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRevisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
