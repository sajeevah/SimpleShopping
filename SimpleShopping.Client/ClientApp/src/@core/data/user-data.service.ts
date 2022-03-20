import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IToken } from '../models/token.model';
import { ILogin } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class UserDataService extends AbstractHttpClient {

  constructor(protected httpClient: HttpClient) { 
    super(httpClient);
  }

  public getUser(): Observable<IUser> {
    return this.get<IUser>( `Auth/user`);
  }

  public loginUser(payload: ILogin): Observable<IToken> {
    return this.post<IToken>( `Auth/login`, payload);
  }

}