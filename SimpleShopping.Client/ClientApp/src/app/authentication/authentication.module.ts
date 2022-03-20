import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLoginComponent } from './auth-login/auth-login.component';
import { AuthRegisterComponent } from './auth-register/auth-register.component';
import { AuthenticationRoutingModule } from './authentication-route.module';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthRegisterComponent,
],
  imports: [
    AuthenticationRoutingModule,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: []
})
export class AuthenticationModule {}
