import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyItemsComponent } from './my-items/my-items.component';

const routes: Routes = [
  {
    path: 'my-items',
    component: MyItemsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}