import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = 'http://localhost:3000/';

  constructor(private http: HttpClient, private router: Router) { }

  login(loginForm: { email: string, password: string }): Observable<any> {
    console.log(loginForm);
    return this.http.post<{ token: string }>(`${this.URL}sign`, loginForm).pipe(
      map(res => {
        localStorage.removeItem('access_token');
        localStorage.setItem('access_token', res.token);
        return this.router.navigate(['admin']);
      }),
      catchError(e => {
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(() => 'Servidor indisponível')
      })
    )
  }

  logout() {
    localStorage.removeItem('access_token');
    return this.router.navigate(['']);
  }
}
