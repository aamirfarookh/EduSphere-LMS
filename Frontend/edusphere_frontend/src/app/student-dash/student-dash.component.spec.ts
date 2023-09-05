import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashComponent } from './student-dash.component';

describe('StudentDashComponent', () => {
  let component: StudentDashComponent;
  let fixture: ComponentFixture<StudentDashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentDashComponent]
    });
    fixture = TestBed.createComponent(StudentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
