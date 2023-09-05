import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-enrolled-courses',
  templateUrl: './enrolled-courses.component.html',
  styleUrls: ['./enrolled-courses.component.css']
})
export class EnrolledCoursesComponent implements OnInit {
  enrolled_courses: any[] = [];
  access_token: string =  localStorage.getItem("access_token") || ""
   selectedCourse: any = null;

  showAlert(title,text,status,button) {
    Swal.fire({
      title,
      text,
      icon:status,
      confirmButtonText:button,
    });
  }


  constructor(private http: HttpClient ,
              private router: Router
              ) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`
    });

    const options = { headers: headers };
    this.http.get<any[]>('http://localhost:8000/api/students/enrolled-courses/',options).subscribe(
      (data) => {
        this.enrolled_courses = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.showAlert("Please Login!!",error.statusText,"error","OK")
        this.router.navigate(['/student-login'])
      }
    );
  }
  navigateToViewAssignments(courseId: number) {
    console.log(courseId)
    this.router.navigate(['enrolled-courses', 'view-assignments', courseId]);
  
}
}