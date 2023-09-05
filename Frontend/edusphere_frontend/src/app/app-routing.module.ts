import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { Dashboard } from './student-dash/student-dash.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'student-login', component: StudentLoginComponent },
  { path: 'student-signup', component: StudentSignupComponent },
  // { path: 'instructor-login', component: InstructorLoginComponent },
  // { path: 'instructor-signup', component: InstructorSignupComponent },
  { path: 'student-dash', component: Dashboard },
  { path: 'student-home', component: StudentHomeComponent },
  { path: 'all-courses', component: AllCoursesComponent },
  { path: 'enrolled-courses', component: EnrolledCoursesComponent },
  { path: 'enrolled-courses/view-assignments/:course_id', component: ViewAssignmentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

