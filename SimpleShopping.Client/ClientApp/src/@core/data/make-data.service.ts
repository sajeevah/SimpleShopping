import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractHttpClient } from '../clients/abstract-http.client';
import { HttpClient } from '@angular/common/http';
import { IMake } from '../models/make.model';


@Injectable({
  providedIn: 'root'
})
export class MakeDataService extends AbstractHttpClient {

  constructor(protected httpClient: HttpClient) { 
    super(httpClient);
  }

  public getAll(): Observable<IMake[]> {
    return this.get<IMake[]>( `Make`);
  }

  public getById(id: number): Observable<IMake> {
    return this.get<IMake>( `Make/${id}`);
  }

  public create(payload: IMake): Observable<IMake> {
    return this.post<IMake>( `Make`, payload);
  }

  public update(payload: IMake): Observable<IMake> {
    return this.put<IMake>(`Make`, payload);
  };

  public deleteMake(id: string): Observable<IMake> {
    return this.delete<IMake>(`Make/${id}`, );
  };
}