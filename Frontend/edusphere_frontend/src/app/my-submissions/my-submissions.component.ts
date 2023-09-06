import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-submissions',
  templateUrl: './my-submissions.component.html',
  styleUrls: ['./my-submissions.component.css']
})
export class SubmissionsComponent implements OnInit {
  submissions: any[] = [];
  access_token: string =  localStorage.getItem("access_token") || "";
  showAlert(title,text,status,button) {
    Swal.fire({
      title,
      text,
      icon:status,
      confirmButtonText:button,
    });
  }

  constructor(private http: HttpClient,private router:Router) { }

  ngOnInit(): void {
    this.fetchSubmissions();
  }

  fetchSubmissions() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`
    });

    const options = { headers: headers };
    this.http.get<any[]>('http://52.66.38.71/api/students/submissions/',options)
      .subscribe(
        (data) => {
          this.submissions = data;
        },
        (error) => {
          console.error('Error fetching submissions:', error);
          this.showAlert("Please Login!!",error.statusText,"error","OK")
          this.router.navigate(['/student-login'])
        }
      );
  }
}
