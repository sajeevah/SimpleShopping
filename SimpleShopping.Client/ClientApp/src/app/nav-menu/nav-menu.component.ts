import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { IUser } from 'src/@core/models/user.model';
import { AuthService } from '../../@core/auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  public auhtenticated: boolean = false;
  public currentUser: IUser = {};


  constructor(
    private authService: AuthService,
    private router: Router,
  ){

  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public ngOnInit(): void {
    this.authService.currentUser.pipe(
      map(user => {
        if(user) {
          this.auhtenticated = true;
          this.currentUser = user;
        } else {
          this.auhtenticated = false;
        }
      })
    ).subscribe()
  }

  public logout(): void {
    this.authService.logout();
    location.reload();
  }

  public get hideMenu(): boolean {
    return this.router.url === '/auth/login';
  }
}
