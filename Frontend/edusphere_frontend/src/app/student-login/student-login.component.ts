import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
})
export class StudentLoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData = this.loginForm.value;

    // Make an HTTP POST request to the student login endpoint
    this.http.post<any>('http://localhost:8000/api/students/login/', formData).subscribe(
      (response) => {
        // Handle the successful login response here
        // Assuming you receive access_token and refresh_token in the response
        // You can save these tokens in local storage or a cookie for future requests
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        alert("Login Successful")
        // this.router.navigate(['/student-dashboard']);
      },
      (error) => {
        // Handle login error here (e.g., display an error message)
        console.log('Login error:', error);
        alert(error.error.message)
      }
    );
  }
}

