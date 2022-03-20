import { Injectable, Inject } from '@angular/core';
import { IItem } from '../models/item.model';
import { IUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly jwtKey: string = 'auth.jwt.token';
  private readonly expJwtKey: string = 'auth.jwt.token_exp';
  private readonly currentUser: string = 'auth.user';
  private readonly cart: string = 'auth.cart';

  constructor() { }

  public getJwtToken(): any {
    const jwtToken: any =  localStorage.getItem(this.jwtKey);
    return jwtToken;
  };

  public getCurrentUser(): any {
    if(localStorage.getItem(this.currentUser)) {
        const user: IUser =  JSON.parse(localStorage.getItem(this.currentUser) || '');
        return user;
    } else {
        return null;
    }
  };

  public getCart(): IItem[] {
    if(localStorage.getItem(this.cart)) {
        const items: IItem[] =  JSON.parse(localStorage.getItem(this.cart) || '');
        return items;
    } else {
        return [];
    }
  };

  public getExpJwtToken(): any {
    const expJwtKey: any = localStorage.getItem(this.expJwtKey);
    return expJwtKey;
  };

  public setJwtToken(jwtToken: string) {
    localStorage.setItem(this.jwtKey, jwtToken);
  };

  public setCurrentUser(user: IUser) {
    localStorage.setItem(this.currentUser, JSON.stringify(user));
  };

  public setCart(items: IItem[]) {
    localStorage.setItem(this.cart, JSON.stringify(items));
  };

  public setExpJwtToken(jwtExp: string) {
    localStorage.setItem(this.expJwtKey, jwtExp);;
  };

  public destroyAllData() {
    localStorage.removeItem(this.jwtKey);
    localStorage.removeItem(this.expJwtKey);
    localStorage.removeItem(this.currentUser);
    localStorage.removeItem(this.cart);
  }

}