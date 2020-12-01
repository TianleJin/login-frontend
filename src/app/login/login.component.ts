import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoginStateService } from '../services/login-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  message: string = null;
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService,
    private router: Router,
    private lsService: LoginStateService
  ) { }

  ngOnInit() {
    // this.lsService.getState().subscribe((state) => console.log("Logged In: ", state));
  }

  onSubmit() {
    // Validate the username and password with the database
    // Redirect user to Homepage
    this.loading = true;
    this.dbService.getOne(this.userName.value).subscribe((user) => {
      if (user === null) {
        this.message = 'Username does not exist.';
      }
      else if (user['password'] !== this.password.value) {
        this.message = 'Username or password is incorrect.';
      }
      else {
        console.log('Your login was successful.');
        this.lsService.setState(true);
        this.router.navigate(['home', this.userName.value]);
      }
      this.loading = false;
    }, (err) => {
      this.message = err;
      this.loading = false;
    })
  }

  get userName() { return this.loginForm.get('userName'); }
  get password() { return this.loginForm.get('password'); }
}
