import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/@core/auth/auth.service';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { IItem } from 'src/@core/models/item.model';
import { StorageService } from 'src/@core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items: IItem[] = [];

  constructor(
    private itemDataService: ItemDataService,
    private authService: AuthService,
    private storageService: StorageService
  ) {

  }
  
  public ngOnInit(): void {
    this.getItems();
  }

  private getItems(): void {
    this.itemDataService.getAll().pipe(take(1))
      .subscribe( data => { this.items = data } );
  }

  public addToCart(id?: string): void {
    let cartItems = this.storageService.getCart();
    let item = this.items.filter( x => x.id == id )[0];
    item.id = `${item.id}-${cartItems.length+1}`;
    cartItems.push(item);
    this.storageService.setCart(cartItems);
  }

  public isSeller() {
    return this.authService.isSeller;
  }

  public isBuyer() {
    return this.authService.isBuyer;
  }
  
}
