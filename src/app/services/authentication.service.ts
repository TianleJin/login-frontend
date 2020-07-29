import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import db from '../../assets/db.json';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private db: DatabaseService
  ) { }

  UsernameExist(username: string): Observable<boolean> {
    for (let i = 0; i < db['users'].length; i++) {
      if (username === db['users'][i]['username']) {
        return of(true).pipe(delay(1000));
      }
    }
    return of(false).pipe(delay(1000));
  }

  PasswordMatchUsername(username: any, password: any) {
    for (let i = 0; i < db['users'].length; i++) {
      if (username === db['users'][i]['username']) {
        return of(password === db['users'][i]['password']);
      }
    }
  }
}
