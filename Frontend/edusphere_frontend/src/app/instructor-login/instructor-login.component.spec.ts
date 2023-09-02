import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorLoginComponent } from './instructor-login.component';

describe('InstructorLoginComponent', () => {
  let component: InstructorLoginComponent;
  let fixture: ComponentFixture<InstructorLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorLoginComponent]
    });
    fixture = TestBed.createComponent(InstructorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
