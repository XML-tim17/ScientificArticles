import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForNedimovicComponent } from './for-nedimovic.component';

describe('ForNedimovicComponent', () => {
  let component: ForNedimovicComponent;
  let fixture: ComponentFixture<ForNedimovicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForNedimovicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForNedimovicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
