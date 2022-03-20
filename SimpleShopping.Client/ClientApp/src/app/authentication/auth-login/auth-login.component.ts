import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/@core/auth/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
})
export class AuthLoginComponent implements OnInit {
  
  public loginForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  public get loginFormController() {
    return this.loginForm.controls;
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this.authService
      .login(this.loginFormController.username.value, this.loginFormController.password.value)
      .pipe(take(1))
      .subscribe(
        data => {
          if(data) {
            this.router.navigate(['/']);
          } else {
            this.router.navigate(['/auth/login']);;
          }
        },
        error => {
          console.log(error);
        }
      );
  }

}
