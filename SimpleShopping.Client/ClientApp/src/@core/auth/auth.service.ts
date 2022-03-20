import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { Role } from '../models/role';
import { IUser } from '../models/user.model';
import { Router } from '@angular/router';
import { UserDataService } from '../data/user-data.service';
import { ILogin } from '../models/login.model';
import { StorageService } from '../services/storage.service';
import { IToken } from '../models/token.model';
import { IRegister } from '../models/register.model';
import { IResponse } from '../models/response.model';


@Injectable({ providedIn: 'root' })
export class AuthService {

  public currentUser: Observable<IUser>;

  private currentUserSubject: BehaviorSubject<IUser>;

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private storageService: StorageService,
  ) {
    this.currentUserSubject = new BehaviorSubject<IUser>(this.storageService.getCurrentUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  get isAdmin() {
    return this.currentUserSubject.value && this.currentUserSubject.value.userRole === Role.Admin;
  }

  get isBuyer() {
    return this.currentUserSubject.value && this.currentUserSubject.value.userRole === Role.Buyer;
  }

  get isSeller() {
    return this.currentUserSubject.value && this.currentUserSubject.value.userRole === Role.Seller;
  }

  public login(userName: string, password: string) {
    const loginData: ILogin = {
      password: password,
      username: userName
    }
    return this.userDataService.loginUser(loginData).pipe(
      switchMap((result: IToken) => {
        if(!result) {
          return of(null);
        }
        this.storageService.setJwtToken(result.token || '');
        this.storageService.setExpJwtToken(result.expiration || '');
        return this.userDataService.getUser().pipe(
          map( user => { 
            if (result) {
              this.loginSuccsess(user);
            }
            return result;
          })
        )
      }),
    );
  }

  public registerUser(data: IRegister) {
    return this.userDataService.registerUser(data).pipe(
      switchMap( ( response: IResponse) => {
        if( response.status === 'Success' ) {
          return this.login(data.username || '', data.password || '');
        } else {
          return of(null);
        }
      })
    )
  }


  public logout() {
    this.storageService.destroyAllData();
  }

  private loginSuccsess(result: any) {
    this.storageService.setCurrentUser(result)
    this.currentUserSubject.next(result);
    this.router.navigate(['/'])
  }
}
