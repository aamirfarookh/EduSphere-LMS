// view-assignments.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common'; 


@Component({
  selector: 'app-view-assignments',
  templateUrl: './view-assignments.component.html',
  styleUrls: ['./view-assignments.component.css']
})
export class ViewAssignmentsComponent implements OnInit {
  @Input() course: any;
  assignments: any[] = [];
  selectedAssignment: any;
  assignmentSubmission: string = '';
  access_token: string =  localStorage.getItem("access_token") || "";
  submissionData: { [assignmentId: string]: string } = {}; 

  showAlert(title,text,status,button) {
    Swal.fire({
      title,
      text,
      icon:status,
      confirmButtonText:button,
    });
  }

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = +params.get('course_id');
      console.log(Date.now())
      // Fetch assignments for the courseId and display them
      this.fetchAssignments(courseId);
    })
   
  }

  fetchAssignments(courseID: number): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`
    });

    const options = { headers: headers };
    const apiUrl = `http://localhost:8000/api/students/assignments/${courseID}/`;

    this.http.get(apiUrl,options).subscribe((data: any[]) => {
      this.assignments = data;
    },
  (error) => {
    console.error('Error fetching data:', error);

    // Handle the error here, for example, display a message to the user
    // or perform any other actions you need.

    // You can also show a custom error message using Swal.fire as you did before:
    this.showAlert('Error', error.statusText, 'error', 'OK');
    this.router.navigate(["/student-login"])
  }
    );
  }

  showAssignmentDetails(assignment: any): void {
    this.selectedAssignment = assignment;
  }

  submitAssignment(): void {
    if (!this.selectedAssignment) {
      // Handle error condition, such as showing an alert to the user.
      console.log(this.selectedAssignment)
      console.log(this.assignmentSubmission)
      console.error('Invalid assignment');
      return;
    }
  
    const dueDate = new Date(this.selectedAssignment.due_date);
    const submissionDate = new Date(); // Current date and time
  
    let status: string;
  
    if (submissionDate <= dueDate) {
      status = 'Submitted';
    } else {
      status = 'Late';
    }

    const submission = this.submissionData[this.selectedAssignment.id];

    if (!submission) {
      // Handle error condition, such as showing an alert to the user.
      console.error('Invalid submission data');
      return;
    }
  
    // Create the payload to send in the POST request
    const payload = {
      assignment: this.selectedAssignment.id,
      submission_date: formatDate(submissionDate, 'yyyy-MM-dd', 'en-US'),
      status,
      submission: submission,
      student: 1
    };
  
    // Define the API URL
    const apiUrl = 'http://localhost:8000/api/students/submit-assignment/';
  
    // Define headers with authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.access_token}`,
      'Content-Type': 'application/json'
    });
  
    const options = { headers: headers };
  
    // Make the POST request
    this.http.post(apiUrl, payload, options).subscribe(
      (response) => {
        // Handle successful submission, e.g., show a success message to the user.
        console.log('Assignment submitted successfully:', response);
        this.showAlert('Success', 'Assignment submitted successfully.', 'success', 'OK');
      },
      (error) => {
        // Handle error, e.g., show an error message to the user.
        console.error('Error submitting assignment:', error);
        this.showAlert("Please Login!!",error.statusText,"error","OK")
        this.router.navigate(['/student-login'])
      }
    );
  }
}

