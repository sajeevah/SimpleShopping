import { Component, OnInit } from '@angular/core';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { IItem } from 'src/@core/models/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-items',
  templateUrl: './my-items.component.html'
})
export class MyItemsComponent implements OnInit {
  public items: IItem[] = [];

  constructor(
    private itemDataService: ItemDataService,
    private authService: AuthService,
    private router: Router,
  ) {

  }
  
  public ngOnInit(): void {
    this.itemDataService.getByUserId(this.authService.currentUserValue.id)
      .subscribe( data => { this.items = data } );
  }

  public goToUpdate(id?: string) {
    this.router.navigate([`/seller/update-item/${id}`]);
  }
}
