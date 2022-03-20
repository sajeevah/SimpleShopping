import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { IToken } from '../models/token.model';
import { ILogin } from '../models/login.model';
import { IRegister } from '../models/register.model';
import { IResponse } from '../models/response.model';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserDataService extends AbstractHttpClient {

  constructor(
    protected httpClient: HttpClient,
    protected storageService: StorageService,
  ) { 
    super(httpClient, storageService);
  }

  public getUser(): Observable<IUser> {
    return this.get<IUser>( `Auth/user`);
  }

  public loginUser(payload: ILogin): Observable<IToken> {
    return this.post<IToken>( `Auth/login`, payload);
  }

  public registerUser(payload: IRegister): Observable<IResponse> {
    return this.post<IResponse>( `Auth/register`, payload);
  }

}