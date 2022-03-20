import { Component, OnInit } from '@angular/core';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { AuthService } from 'src/@core/auth/auth.service';
import { IItem } from 'src/@core/models/item.model';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

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
    this.getItems();
  }

  private getItems(): void {
    this.itemDataService.getByUserId(this.authService.currentUserValue.id).pipe(take(1))
      .subscribe( data => { this.items = data } );
  }

  public goToUpdate(id?: string) {
    this.router.navigate([`/seller/update-item/${id}`]);
  }

  public deleteItem(id?: string) {
    this.itemDataService.deleteItem(id).subscribe(
      result => {
        this.getItems();
      },
      error => {
        console.log(error);
      }
    )
  }
}
