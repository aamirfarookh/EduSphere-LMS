import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css'],
})
export class StudentSignupComponent {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      student_id: ['', Validators.required],
      gender: ['', Validators.required], 
      date_of_birth: ['', Validators.required],
      major: ['', Validators.required],
      email: ['', Validators.required], 
      contact_number: ['', Validators.required], 
      username: ['', Validators.required],
      password: ['', Validators.required],
      // Add other form fields here
    });
  }

  onSubmit() {
    const formData = this.signupForm.value;
  
    // Make an HTTP POST request to the student signup endpoint
    this.http.post('http://localhost:8000/api/students/signup/', formData).subscribe(
      (response: any) => {
        // Check the response from the backend
        if (response.message === 'User Created Successfully') {
          // Handle the successful signup here
          // For example, you can navigate to the login page or show a success message
          this.router.navigate(['/student-login']);
        } 
      },
      (error) => {
        // Handle signup error here
        // You can check the error status and display an error message accordingly
        if (error.status === 400 && error.error.message === 'User Already Exists') {
          console.log('User already exists:', error.error.message);
          alert(error.error.message)
        } else {
          // Handle other error cases
          console.log('Signup error:', error.error.message);
          for(let e in error.error.message){
            
            alert(error.error.message[e].toString())
          }
        }
      }
    );
  }
  
}

