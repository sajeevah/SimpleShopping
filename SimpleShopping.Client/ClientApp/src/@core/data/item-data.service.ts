import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../models/item.model';
import { StorageService } from '../services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ItemDataService extends AbstractHttpClient {

  constructor(
    protected httpClient: HttpClient,
    protected storageService: StorageService,
  ) { 
    super(httpClient, storageService);
  }

  public getAll(): Observable<IItem[]> {
    return this.get<IItem[]>( `Item`);
  }

  public getById(id: string): Observable<IItem> {
    return this.get<IItem>( `Item/${id}`);
  }

  public getByUserId(id?: string): Observable<IItem[]> {
    return this.get<IItem[]>( `Item/seller/${id}`);
  }

  public create(payload: IItem): Observable<IItem> {
    return this.post<IItem>( `Item`, payload);
  }

  public update(id?: string, payload?: IItem): Observable<IItem> {
    return this.put<IItem>(`Item/${id}`, payload);
  };

  public deleteItem(id?: string): Observable<IItem> {
    return this.delete<IItem>(`Item/${id}`, );
  };
}