import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { LoginStateService } from '../services/login-state.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: DatabaseService,
    private lsService: LoginStateService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.dbService.getOne(params.get('userName'));
      })
    ).subscribe((data) => {
      this.user = new User(data);
      console.log(this.user);
    }, (err) => {
      console.log(err);
    });

    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        this.lsService.setState(false);
      }
    });
  }

  logout() {
    this.lsService.setState(false);
    this.router.navigate(['login']);
  }
}
