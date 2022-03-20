import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IItemImage } from '../models/item-image.model';


@Injectable({
  providedIn: 'root'
})
export class ItemImageDataService extends AbstractHttpClient {

  constructor(protected httpClient: HttpClient) { 
    super(httpClient);
  }

  public getAll(): Observable<IItemImage[]> {
    return this.get<IItemImage[]>( `ItemImage`);
  }

  public getById(id: number): Observable<IItemImage> {
    return this.get<IItemImage>( `ItemImage/${id}`);
  }

  public create(payload: IItemImage): Observable<IItemImage> {
    return this.post<IItemImage>( `ItemImage`, payload);
  }

  public update(payload: IItemImage): Observable<IItemImage> {
    return this.put<IItemImage>(`ItemImage`, payload);
  };

  public deleteItemImage(id: string): Observable<IItemImage> {
    return this.delete<IItemImage>(`ItemImage/${id}`, );
  };
}