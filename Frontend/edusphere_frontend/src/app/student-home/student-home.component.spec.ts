import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentHomeComponent } from './student-home.component';

describe('StudentHomeComponent', () => {
  let component: StudentHomeComponent;
  let fixture: ComponentFixture<StudentHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentHomeComponent]
    });
    fixture = TestBed.createComponent(StudentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
