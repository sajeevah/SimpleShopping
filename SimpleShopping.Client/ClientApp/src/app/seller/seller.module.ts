import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddItemComponent } from './add-item/add-item.component';
import { MyItemsComponent } from './my-items/my-items.component';
import { SellerRoutingModule } from './seller-route.module';
import { UpdateItemComponent } from './update-item/update-item.component';


@NgModule({
  declarations: [
    MyItemsComponent,
    AddItemComponent,
    UpdateItemComponent
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
