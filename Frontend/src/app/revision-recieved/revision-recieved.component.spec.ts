import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionRecievedComponent } from './revision-recieved.component';

describe('RevisionRecievedComponent', () => {
  let component: RevisionRecievedComponent;
  let fixture: ComponentFixture<RevisionRecievedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionRecievedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionRecievedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
