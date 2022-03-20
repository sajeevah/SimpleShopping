import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/@core/auth/auth.service';
import { CategoryDataService } from 'src/@core/data/category-data.service';
import { ItemDataService } from 'src/@core/data/item-data.service';
import { ItemModelDataService } from 'src/@core/data/item-model-data.service';
import { MakeDataService } from 'src/@core/data/make-data.service';
import { ICategory } from 'src/@core/models/category.model';
import { IItemModel } from 'src/@core/models/item-model.model';
import { IItem } from 'src/@core/models/item.model';
import { IMake } from 'src/@core/models/make.model';
import { IRegister } from 'src/@core/models/register.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  
  public addItemForm!: FormGroup;
  public categories: ICategory[] = [];
  public itemModels: IItemModel[] = [];
  public makes: IMake[] = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private categoryDataService: CategoryDataService,
    private itemModelDataService: ItemModelDataService,
    private makeDataService: MakeDataService,
    private itemDataService: ItemDataService,
  ) {

    // if (this.authService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }

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
    this.getCategories();
    this.getItemModels();
    this.getMakes();
  }

  private getCategories(): void {
    this.categoryDataService.getAll().subscribe( data => { this.categories = data } )
  }

  private getItemModels(): void {
    this.itemModelDataService.getAll().subscribe( data => { this.itemModels = data } )
  }

  private getMakes(): void {
    this.makeDataService.getAll().subscribe( data => { this.makes = data } )
  }

  public onSubmit() {

    if (this.addItemForm.invalid) {
      return;
    }

    const data: IItem = {
      name: this.addItemFormController.name.value,
      description: this.addItemFormController.description.value,
      categoryId: this.addItemFormController.category.value,
      itemModelId: this.addItemFormController.model.value,
      makeId: this.addItemFormController.make.value,
      quantity: Number(this.addItemFormController.quantity.value),
      imageUrl: '',
      sellerId: this.authService.currentUserValue.id,
    }

    this.itemDataService.create(data).subscribe(
      result => {
        this.router.navigate(['/seller/my-items']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
