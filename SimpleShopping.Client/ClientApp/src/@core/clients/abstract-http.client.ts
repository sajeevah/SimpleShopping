import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../services/storage.service';


export abstract class AbstractHttpClient {

  private readonly baseApiUrl: string;  

  constructor(
    protected httpClient: HttpClient,
    protected storageService: StorageService,
  ) { 
    this.baseApiUrl = environment.baseApiUrl;
  }

  protected get<T>(path: string): Observable<T> {
    return  (
      this.httpClient
        .get(`${this.baseApiUrl}/${path}/`, {
          headers: this.getHeaders()
        })
    ) as Observable<T>;
  }

  protected post<T>(path: string, payload: any = {}): Observable<T> {
    return  (
      this.httpClient
        .post(`${this.baseApiUrl}/${path}`, payload, {
          headers: this.getHeaders()
        })
    ) as Observable<T>;
  }

  protected postFile<T>(path: string, payload: FormData): Observable<T> {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ Accept: 'application/json' })
    };
    return  (
      this.httpClient
        .post(`${this.baseApiUrl}/${path}`, payload, HttpUploadOptions)
    ) as Observable<T>;
  }

  protected put<T>(path: string, payload: any = {}): Observable<T> {
    return  (
      this.httpClient
        .put(`${this.baseApiUrl}/${path}`, payload, {
          headers: this.getHeaders()
        })
    ) as Observable<T>;
  }

  protected delete<T>(path: string): Observable<T> {
    return  (
      this.httpClient
        .delete(`${this.baseApiUrl}/${path}`, {
          headers: this.getHeaders()
        })
    ) as Observable<T>;
  }

  private getHeaders(): HttpHeaders {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const jwt = this.storageService.getJwtToken();
    // tslint:disable-next-line: no-string-literal
    if (jwt != null) { headersConfig['Authorization'] = `Bearer ${jwt}`; }
    return new HttpHeaders(headersConfig);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error('error : ', error);
    }
    return throwError(error.error);
  }
}