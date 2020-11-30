import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../services/database.service';
import { ValidatorService } from '../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  message: string = null;
  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.required],
    userName: ['', {
      validators: [Validators.required],
      asyncValidators: [this.validatorService.usernameTakenValidator()],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required]
  }, { validator: this.validatorService.passwordMatchValidator() });

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    // Validate the username and password with the database
    // Redirect user to Homepage
    this.loading = true;
    this.dbService.create(this.registrationForm.value).subscribe((res) => {
      console.log('Your account has been created.');
      this.loading = false;
    }, (err) => {
      this.message = err;
      this.loading = false;
    });
  }

  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get phone() { return this.registrationForm.get('phone'); }
  get userName() { return this.registrationForm.get('userName'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }
}
