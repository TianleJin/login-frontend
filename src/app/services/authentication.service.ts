import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private dbService: DatabaseService,
  ) { }

  UsernameExist(username: string): Observable<boolean> {
    return this.dbService.getOne(username).pipe(map(res => {
      return res !== null;
    }));
  }
}
