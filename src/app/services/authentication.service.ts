import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private dbService: DatabaseService,
    private router: Router
  ) { }

  UsernameExist(username: string): Observable<boolean> {
    return this.dbService.getOne(username).pipe(map(res => {
      return res !== null;
    }));
  }

  login(userName: string) {
    localStorage.setItem('isLoggedIn', 'true');  
    localStorage.setItem('userName', userName);
    this.router.navigate(['home']);
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userName');
    this.router.navigate(['login']);
  }
}
