import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoginComponent } from './student-login.component';

describe('StudentLoginComponent', () => {
  let component: StudentLoginComponent;
  let fixture: ComponentFixture<StudentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentLoginComponent]
    });
    fixture = TestBed.createComponent(StudentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
