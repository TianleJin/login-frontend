import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';

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
    private authService: AuthService
  ) { }

  ngOnInit() { }
    
  onSubmit() {
    // Validate the username and password with the database
    // Redirect user to Homepage
    this.loading = true;
    this.dbService.getOne(this.userName.value).subscribe((user) => {
      if (user === null || user['password'] !== this.password.value) {
        this.message = 'Username or password is incorrect.';
      }
      else {
        console.log('Your login was successful.');
        this.authService.login(this.userName.value);
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
