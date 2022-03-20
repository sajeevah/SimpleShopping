import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyItemsComponent } from './my-items/my-items.component';
import { SellerRoutingModule } from './seller-route.module';


@NgModule({
  declarations: [
    MyItemsComponent,
],
  imports: [
    SellerRoutingModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: []
})
export class SellerModule {}
