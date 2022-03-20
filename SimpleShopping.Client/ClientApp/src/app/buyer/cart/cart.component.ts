import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/@core/models/item.model';
import { StorageService } from 'src/@core/services/storage.service';
@Component({
  selector: 'app-cart-component',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public items: IItem[] = [];
  public total: number = 0;

  constructor(protected storageService: StorageService){

  }

  public ngOnInit(): void {
    this.setCartItems();
  }

  private setCartItems(): void {
    this.items = this.storageService.getCart();
    this.total = 0;
    this.items.forEach( x => { this.total += x.price || 0 })
  }

  public removeFromCart(id?: string): void {
    this.items = this.items.filter( x => x.id != id );
    this.storageService.setCart(this.items);
    this.setCartItems();
  }
  
}
