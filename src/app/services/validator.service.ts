import { AsyncValidatorFn, ValidatorFn, ValidationErrors, AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor(
    private authService: AuthService
  ) {}

  usernameTakenValidator(): AsyncValidatorFn {
    return (ctrl: AbstractControl): Observable<ValidationErrors | null> => {
      return this.authService.UsernameExist(ctrl.value).pipe(
        map((isTaken: any) => (isTaken ? { usernameTaken: true } : null)), 
        catchError(() => of(null))
      );
    };
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');
      return password.value === confirmPassword.value ? null: { 'passwordMismatch': true };
    };
  }
}
