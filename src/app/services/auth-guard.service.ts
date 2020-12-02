import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {      
      return true;      
    }      
    // navigate to login page as user is not authenticated      
    this.router.navigate(['login']);      
    return false;  
  }

  public isLoggedIn(): boolean {
    let status: boolean;      
    if (sessionStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }    
    else {      
      status = false;      
    }      
    return status;      
  }    
}    
