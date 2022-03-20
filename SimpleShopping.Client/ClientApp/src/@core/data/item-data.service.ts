import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IItem } from '../models/item.model';


@Injectable({
  providedIn: 'root'
})
export class ItemDataService extends AbstractHttpClient {

  constructor(protected httpClient: HttpClient) { 
    super(httpClient);
  }

  public getAll(): Observable<IItem[]> {
    return this.get<IItem[]>( `Item`);
  }

  public getById(id: number): Observable<IItem> {
    return this.get<IItem>( `Item/${id}`);
  }

  public create(payload: IItem): Observable<IItem> {
    return this.post<IItem>( `Item`, payload);
  }

  public update(payload: IItem): Observable<IItem> {
    return this.put<IItem>(`Item`, payload);
  };

  public deleteItem(id: string): Observable<IItem> {
    return this.delete<IItem>(`Item/${id}`, );
  };
}