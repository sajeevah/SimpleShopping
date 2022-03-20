import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { MyItemsComponent } from './my-items/my-items.component';

const routes: Routes = [
  {
    path: 'my-items',
    component: MyItemsComponent,
  },
  {
    path: 'add-item',
    component: AddItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}