import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  message: string = null;
  success: boolean = false;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // Validate the username and password with the database
    // Redirect user to Homepage
    this.loading = true;
    this.dbService.getOne(this.userName.value).subscribe((user) => {
      if (user === null) {
        this.message = 'Username does not exist.';
        this.success = false;
      }
      else if (user['password'] === this.password.value) {
        this.message = 'Your login was successful';
        this.success = true;
      }
      else {
        this.message = 'Username or password is incorrect';
        this.success = false;
      }
      this.loading = false;
    })
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
}
