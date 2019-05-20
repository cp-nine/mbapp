import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import LoginModel from 'src/app/models/login-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  loginFailed: boolean = false;
  message: string = '';

  auth: LoginModel;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) 
  { 
    
  }

  ngOnInit() {   
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public get f() {
    return this.loginForm.controls;
  }

  // login process
  loginProcess(){
    this.submitted = true;
    this.auth = this.loginForm.value;

    // check validation form
    if (this.loginForm.invalid) {

      return;

    }

    // call login auth service to hit api login
    this.service.getToken(this.auth).subscribe(
      response => {
        if(response.error){
          this.loginFailed = true;
          this.message = response.error_description;
        } else {
          localStorage.setItem("user", `${response.cif}`);
          localStorage.setItem("act", `${response.access_token}`);
          localStorage.setItem("rsh", `${response.refresh_token}`);
          this.router.navigateByUrl("/customer/dashboard");
        }
      }
    );

    
  }

}
