import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignmentsComponent } from './view-assignments.component';

describe('ViewAssignmentsComponent', () => {
  let component: ViewAssignmentsComponent;
  let fixture: ComponentFixture<ViewAssignmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAssignmentsComponent]
    });
    fixture = TestBed.createComponent(ViewAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
