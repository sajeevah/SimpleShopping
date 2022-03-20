import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { IItem } from 'src/@core/models/item.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  public items: IItem[] = [];

  constructor(
    private itemDataService: ItemDataService,
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
    
  }
  
}
