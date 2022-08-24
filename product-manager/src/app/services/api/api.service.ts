import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
    
  }

  apiUrl = 'https://assessment.farm21.com/api/';

  post(url: string, body): Observable<any> {
    let requestUrl = this.apiUrl + url;
    return this.http
      .post(requestUrl, body)
      .pipe(catchError(this.handleError));
  }

  put(url: string, body): Observable<any> {
    let requestUrl = this.apiUrl + url;
    return this.http
      .put(requestUrl, body)
      .pipe(catchError(this.handleError));
  }

  get(url: string) {
    const requestUrl = this.apiUrl + url;
    return this.http.get<any[]>(requestUrl)
    .pipe(
      catchError(this.handleError)
    );
  }

  delete(url: string): Observable<any> {
    let requestUrl = this.apiUrl + url;
    return this.http
      .delete(requestUrl)
      .pipe(catchError(this.handleError));
  }
  
  handleError(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
        return errorMessage;
    });
  }
}
