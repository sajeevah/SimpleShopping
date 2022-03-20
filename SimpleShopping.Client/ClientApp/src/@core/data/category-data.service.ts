import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryDataService extends AbstractHttpClient {

  constructor(protected httpClient: HttpClient) { 
    super(httpClient);
  }

  public getAll(): Observable<ICategory[]> {
    return this.get<ICategory[]>( `Category`);
  }

  public getById(id: number): Observable<ICategory> {
    return this.get<ICategory>( `Category/${id}`);
  }

  public create(payload: ICategory): Observable<ICategory> {
    return this.post<ICategory>( `Category`, payload);
  }

  public update(payload: ICategory): Observable<ICategory> {
    return this.put<ICategory>(`Category`, payload);
  };

  public deleteCategory(id: string): Observable<ICategory> {
    return this.delete<ICategory>(`Category/${id}`, );
  };
}