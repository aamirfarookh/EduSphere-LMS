import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  redirectToStudentLogin() {
    this.router.navigate(['/student-login']);
  }

  redirectToStudentSignup() {
    this.router.navigate(['/student-signup']);
  }

  redirectToInstructorLogin() {
    this.router.navigate(['/instructor-login']);
  }

  redirectToInstructorSignup() {
    this.router.navigate(['/instructor-signup']);
  }
}
