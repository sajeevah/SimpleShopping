import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';


export abstract class AbstractHttpClient {

  private readonly baseApiUrl: string;  

  constructor(protected httpClient: HttpClient) { 
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
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //const jwt = this.jwt.getAccessToken();
    // tslint:disable-next-line: no-string-literal
    // if (jwt != null) { headersConfig['Authorization'] = `Bearer ${jwt}`; }
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