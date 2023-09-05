import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentSignupComponent } from './student-signup/student-signup.component';
import { InstructorLoginComponent } from './instructor-login/instructor-login.component';
import { InstructorSignupComponent } from './instructor-signup/instructor-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Dashboard } from './student-dash/student-dash.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { AllCoursesComponent } from './all-courses/all-courses.component';
import { EnrolledCoursesComponent } from './enrolled-courses/enrolled-courses.component';
import { ViewAssignmentsComponent } from './view-assignments/view-assignments.component';
import { SubmissionsComponent } from './my-submissions/my-submissions.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StudentLoginComponent,
    StudentSignupComponent,
    InstructorLoginComponent,
    InstructorSignupComponent,
    Dashboard,
    StudentHomeComponent,
    AllCoursesComponent,
    EnrolledCoursesComponent,
    ViewAssignmentsComponent,
    SubmissionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
