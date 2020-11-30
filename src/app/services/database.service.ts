import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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
    return this.httpClient.get(`${baseUrl}/users`);
  }

  getOne(username: string) {
    // get request
    return this.httpClient.get(`${baseUrl}/users/${username}`);
  }

  create(data: any) {
    // post request
    this.httpClient.post(`${baseUrl}/users`, data);
  }

  update(username: string, data: any) {
    // put request
    this.httpClient.put(`${baseUrl}/users/${username}`, data);
  }

  delete(username: any) {
    this.httpClient.delete(`${baseUrl}/users/${username}`);
  }

  deleteAll() {
    // delete request
    this.httpClient.delete(`${baseUrl}/users`);
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
    return throwError(
      'Something bad happened; please try again later.');
  }
}
