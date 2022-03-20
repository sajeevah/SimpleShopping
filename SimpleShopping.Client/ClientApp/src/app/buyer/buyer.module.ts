import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuyerRoutingModule } from './buyer-route.module';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    CartComponent,
],
  imports: [
    BuyerRoutingModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: []
})
export class BuyerModule {}
