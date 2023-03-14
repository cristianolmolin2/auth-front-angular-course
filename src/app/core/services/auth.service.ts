import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  login(loginForm: { email: string, password: string }): Observable<any> {
    console.log(loginForm);
    return this.http.post(`${this.URL}sign`, loginForm).pipe(
      map(res => {
        return console.log(res);
      }),
      catchError(e => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(() => 'Servidor indisponível')
      })
    )
  }
}
