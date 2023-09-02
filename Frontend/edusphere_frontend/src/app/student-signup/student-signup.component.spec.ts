import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSignupComponent } from './student-signup.component';

describe('StudentSignupComponent', () => {
  let component: StudentSignupComponent;
  let fixture: ComponentFixture<StudentSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentSignupComponent]
    });
    fixture = TestBed.createComponent(StudentSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
