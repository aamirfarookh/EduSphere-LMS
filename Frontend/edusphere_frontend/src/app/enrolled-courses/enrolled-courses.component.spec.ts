import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledCoursesComponent } from './enrolled-courses.component';

describe('EnrolledCoursesComponent', () => {
  let component: EnrolledCoursesComponent;
  let fixture: ComponentFixture<EnrolledCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledCoursesComponent]
    });
    fixture = TestBed.createComponent(EnrolledCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
