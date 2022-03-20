import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CategoryDataService } from 'src/@core/data/category-data.service';
@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  public currentCount = 0;

  constructor(protected categoryDataService: CategoryDataService){

  }

  public ngOnInit(): void {
    this.categoryDataService.getAll().pipe(
      map( x => {
        console.log('sajeeva : ', x);
      })
    ).subscribe();
  }
  
  public incrementCounter() {
    this.currentCount++;
  }
}
