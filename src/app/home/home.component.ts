import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { switchMap } from 'rxjs/operators';
import { User } from '../shared/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dbService: DatabaseService
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
  }

  logout() {
    this.router.navigate(['login']);
  }
}
