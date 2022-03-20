import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IItemModel } from '../models/item-model.model';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ItemModelDataService extends AbstractHttpClient {

  constructor(
    protected httpClient: HttpClient,
    protected storageService: StorageService,
  ) { 
    super(httpClient, storageService);
  }

  public getAll(): Observable<IItemModel[]> {
    return this.get<IItemModel[]>( `ItemModel`);
  }

  public getById(id: number): Observable<IItemModel> {
    return this.get<IItemModel>( `ItemModel/${id}`);
  }

  public create(payload: IItemModel): Observable<IItemModel> {
    return this.post<IItemModel>( `ItemModel`, payload);
  }

  public update(payload: IItemModel): Observable<IItemModel> {
    return this.put<IItemModel>(`ItemModel`, payload);
  };

  public deleteItemModel(id: string): Observable<IItemModel> {
    return this.delete<IItemModel>(`ItemModel/${id}`, );
  };
}