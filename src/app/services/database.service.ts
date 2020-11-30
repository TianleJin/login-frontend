import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = "http://localhost:3000";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll(): Observable<any> {
    // get request
    return this.httpClient.get(`${baseUrl}/users`)
    .pipe(catchError(this.handleError));
  }

  getOne(username: string) {
    // get request
    return this.httpClient.get(`${baseUrl}/users/${username}`)
    .pipe(catchError(this.handleError));
  }

  create(data: any) {
    // post request
    return this.httpClient.post(`${baseUrl}/users`, data)
    .pipe(catchError(this.handleError));
  }

  update(username: string, data: any) {
    // put request
    return this.httpClient.put(`${baseUrl}/users/${username}`, data)
    .pipe(catchError(this.handleError));
  }

  delete(username: any) {
    return this.httpClient.delete(`${baseUrl}/users/${username}`)
    .pipe(catchError(this.handleError));
  }

  deleteAll() {
    // delete request
    return this.httpClient.delete(`${baseUrl}/users`)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
}
}
