import { Component, OnInit } from '@angular/core';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { IItem } from 'src/@core/models/item.model';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html'
})
export class MyItemsComponent implements OnInit {
  public items: IItem[] = [];

  constructor(
    private itemDataService: ItemDataService,
    private authService: AuthService,
  ) {

  }
  
  public ngOnInit(): void {
    this.itemDataService.getByUserId(this.authService.currentUserValue.id)
      .subscribe( data => { this.items = data } );
  }
}
