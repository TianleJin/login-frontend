import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  errorMessage: string = null;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // Validate the username and password with the database
    // Redirect user to Homepage
    this.loading = true;
    this.authService.UsernameExist(this.userName.value).subscribe((exist) => {
      if (!exist) {
        this.errorMessage = "Username does not exist.";
        this.loading = false;
        return;
      }
      this.authService.PasswordMatchUsername(this.userName.value, this.password.value).subscribe((match) => {
        if (!match) {
          this.errorMessage = "Username or password is incorrect.";
          this.loading = false;
          return;
        }
        this.errorMessage = null;
        this.loading = false;
        console.log("Success");
      });
    });
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
}
