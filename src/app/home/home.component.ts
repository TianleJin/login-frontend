import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(
    private dbService: DatabaseService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.dbService.getOne(sessionStorage.getItem('userName'))
    .subscribe((data) => {
      this.user = new User(data);
      console.log(this.user);
    }, (err) => {
      console.log(err);
    });

    /*
    Use this code to detect go back page event
    this.router.events.subscribe((event: NavigationStart) => { if (event.navigationTrigger === 'popstate') {} });
    */
  }

  logout() {
    this.authService.logout();
  }
}
