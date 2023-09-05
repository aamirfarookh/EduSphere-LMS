import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
})
export class StudentLoginComponent {
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // this.spinner.show();
      this.loading = true;
      // Make an HTTP POST request to the student login endpoint
      this.http.post<any>('http://localhost:8000/api/students/login/', formData).subscribe(
        (response) => {
          // Handle the successful login response here
          // Assuming you receive access_token and refresh_token in the response
          // You can save these tokens in local storage or a cookie for future requests
          // this.spinner.hide();
          this.loading = false;
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          // alert('Login Successful');
          this.showAlert("SUCCESS","LOGIN SUCCESS","success","OK")
          this.showAlert("SUCCESS","Welcome to Dashboard","success","OK")
          this.router.navigate(['/student-dash']);
        },
        (error) => {
          // Handle login error here (e.g., display an error message)
          // this.spinner.hide();
          this.loading = false;
          console.log('Login error:', error.error.message);
          this.showAlert("ERROR",error.error.message,"error","Try Again")
          // alert(error.error.message);
          
        }
      );
    } else {
      // Mark form fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  
}

