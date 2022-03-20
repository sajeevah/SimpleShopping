import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, take } from 'rxjs/operators';
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
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css'],
})
export class UpdateItemComponent implements OnInit {
  
  public updateItemForm!: FormGroup;
  public categories: ICategory[] = [];
  public itemModels: IItemModel[] = [];
  public makes: IMake[] = [];
  public itemId: string = '';
  public item: IItem = {};
  public filename: string = '';
  public formData = new FormData();
  private isImageUpload = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private categoryDataService: CategoryDataService,
    private itemModelDataService: ItemModelDataService,
    private makeDataService: MakeDataService,
    private itemDataService: ItemDataService,
  ) {

  }

  public get updateItemFormController() {
    return this.updateItemForm.controls;
  }

  public setFile(files: FileList | null) {
    if (files && files[0]) {
      this.filename = files[0].name;
      this.formData = new FormData();
      this.formData.append(files[0].name, files[0]);
      this.isImageUpload = true;
    } else {
      this.isImageUpload = false;
    }
  }

  public ngOnInit(): void {

    this.itemId = this.route.snapshot.paramMap.get('id') || '';

    this.updateItemForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      model: ['', Validators.required],
      make: ['', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
    });

    this.getItem();
    this.getCategories();
    this.getItemModels();
    this.getMakes();
  }

  private getItem(): void {
    this.itemDataService.getById(this.itemId).subscribe(
      data => { 
        this.item = data;
        this.updateItemFormController.name.setValue(this.item.name); 
        this.updateItemFormController.description.setValue(this.item.description); 
        this.updateItemFormController.category.setValue(this.item.categoryId); 
        this.updateItemFormController.model.setValue(this.item.itemModelId); 
        this.updateItemFormController.make.setValue(this.item.makeId); 
        this.updateItemFormController.quantity.setValue(this.item.quantity); 
        this.updateItemFormController.price.setValue(this.item.price); 
      });
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

    if (this.updateItemForm.invalid) {
      return;
    }

    let data: IItem = {
      id: this.item.id,
      name: this.updateItemFormController.name.value,
      description: this.updateItemFormController.description.value,
      categoryId: this.updateItemFormController.category.value,
      itemModelId: this.updateItemFormController.model.value,
      makeId: this.updateItemFormController.make.value,
      quantity: Number(this.updateItemFormController.quantity.value),
      price: Number(this.updateItemFormController.price.value),
      imageUrl: this.item.imageUrl,
      sellerId: this.authService.currentUserValue.id,
    }

    if( this.isImageUpload ) {
      this.itemDataService.uploadImage(this.formData).pipe(
        take(1),
        switchMap(( imagePath ) => {
          data.imageUrl = imagePath.path;
          return this.updateItem(data);
        })
      ).subscribe();
    } else {
      this.updateItem(data).subscribe();
    }
    
  }

  private updateItem(data: IItem) {
    return this.itemDataService.update(this.item.id, data).pipe(
      map( result => {
        this.router.navigate(['/seller/my-items']);
      })
    )
  }
}
