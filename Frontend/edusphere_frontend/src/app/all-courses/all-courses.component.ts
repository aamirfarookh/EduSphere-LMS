import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses: any[] = [];
  access_token: string =  localStorage.getItem("access_token") || ""

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
    this.http.get<any[]>('http://52.66.38.71/api/students/courses/').subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  enroll(courseId: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`
    });

    const options = { headers: headers };
    this.http.post<any>('http://52.66.38.71/api/students/enroll/', { course:courseId,student:1} , options).subscribe(
      (response) => {
        // Handle successful enrollment, e.g., show a success message
        console.log('Enrollment successful:', response);
        
          this.showAlert("SUCCESS","Enrolled Successfully","success","OK")
        
        
      },
      (error) => {
        // Handle enrollment error, e.g., show an error message
        console.log('Enrollment error:', error);
        if(error.error.statusText =='Already enrolled in this course'){
          this.showAlert("ERROR","Already enrolled in this course","error","OK")
        }
        else{
          this.showAlert("Please Login!!",error.statusText,"error","OK")
          this.router.navigate(['/student-login'])
        }
        
      }
    );
  }
}

