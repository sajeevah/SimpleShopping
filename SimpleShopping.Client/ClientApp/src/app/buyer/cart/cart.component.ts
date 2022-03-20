import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { StorageService } from 'src/@core/services/storage.service';
@Component({
  selector: 'app-cart-component',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  public currentCount = 0;

  constructor(protected storageService: StorageService){

  }

  public ngOnInit(): void {

  }
  
  public incrementCounter() {
    this.currentCount++;
  }
}
