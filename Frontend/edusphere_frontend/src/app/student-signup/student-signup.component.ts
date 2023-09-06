import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-student-signup',
  templateUrl: './student-signup.component.html',
  styleUrls: ['./student-signup.component.css'],
})
export class StudentSignupComponent {
  signupForm: FormGroup;
  loading = false;
  showAlert(title,text,status,button) {
    Swal.fire({
      title,
      text,
      icon:status,
      confirmButtonText:button,
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
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
    if (this.signupForm.valid) {
    const formData = this.signupForm.value;
    this.loading = true;
    // Make an HTTP POST request to the student signup endpoint
    this.http.post('http://52.66.38.71/api/students/signup/', formData).subscribe(
      (response: any) => {
        // Check the response from the backend
        this.loading = false;
        if (response.message === 'User Created Successfully') {
          // Handle the successful signup here
          // For example, you can navigate to the login page or show a success message
          this.showAlert("SUCCESS","REGISTRATION SUCCESSFUL","success","OK")
          this.router.navigate(['/student-login']);
        } 
      },
      (error) => {
        // Handle signup error here
        // You can check the error status and display an error message accordingly
        this.loading = false;
        if (error.status === 400 && error.error.message === 'User Already Exists') {
          console.log('User already exists:', error.error.message);
          this.showAlert("ERROR",error.error.message,"error","Try Again")
        } else {
          // Handle other error cases
          console.log('Signup error:', error.error.message);
          for(let e in error.error.message){
            this.showAlert("ERROR",`${e}:-${error.error.message[e].toString()}`,"error","Try Again")
          }
        }
      }
    );
    }
    else{
      this.signupForm.markAllAsTouched();
    }
  }
  
}

