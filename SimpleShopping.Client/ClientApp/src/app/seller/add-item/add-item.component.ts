import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/@core/auth/auth.service';
import { IRegister } from 'src/@core/models/register.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  
  public addItemForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }

  }

  public get addItemFormController() {
    return this.addItemForm.controls;
  }

  public ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      model: ['', Validators.required],
      make: ['', Validators.required],
      quantity: [0, Validators.required],
    });
  }

  public onSubmit() {

    if (this.addItemForm.invalid) {
      return;
    }

    const data: IRegister = {
      email: this.addItemFormController.email.value,
      username: this.addItemFormController.username.value,
      password: this.addItemFormController.password.value,
      role: this.addItemFormController.role.value,
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
