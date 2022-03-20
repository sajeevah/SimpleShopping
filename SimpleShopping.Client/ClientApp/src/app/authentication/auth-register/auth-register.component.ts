import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/@core/auth/auth.service';
import { IRegister } from 'src/@core/models/register.model';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
})
export class AuthRegisterComponent implements OnInit {
  
  public registerForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  public get registerFormController() {
    return this.registerForm.controls;
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['Seller', Validators.required],
    });
  }

  public onSubmit() {

    if (this.registerForm.invalid) {
      return;
    }

    const data: IRegister = {
      email: this.registerFormController.email.value,
      username: this.registerFormController.username.value,
      password: this.registerFormController.password.value,
      role: this.registerFormController.role.value,
    }

    this.authService
      .registerUser(data)
      .pipe(take(1))
      .subscribe(
        data => {
          if(data) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/auth/register']);;
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
