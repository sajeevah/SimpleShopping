import { NgModule } from '@angular/core';
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
    AuthenticationRoutingModule
  ],
  providers: []
})
export class AuthenticationModule {}
