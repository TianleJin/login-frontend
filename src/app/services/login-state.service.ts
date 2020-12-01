import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginStateService {
  initialState: boolean = false;
  loggedIn: BehaviorSubject<boolean>;
  constructor() { 
    this.loggedIn = new BehaviorSubject(this.initialState);
  }

  getState() {
    return this.loggedIn;
  }

  setState(newState: boolean) {
    this.loggedIn.next(newState);
  }
}