import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, BehaviorSubject } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';

import { User } from '../model/user';
import { TokenAndId } from '../model/token-and-id';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:4000/auth';

  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  userId!: Pick<User, 'id'>;
  name!: Pick<User, 'id'>;
  email!: Pick<User, 'id'>;

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  signup(user: Omit<User, 'id'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<User>('signup'))
      );
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<TokenAndId> {
    return this.http
      .post<TokenAndId>(
        `${this.url}/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        first(),
        tap((tokenObject: TokenAndId) => {
          this.userId = tokenObject.userId;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['dashboard']);
        }),
        catchError(this.errorHandlerService.handleError<TokenAndId>('login'))
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    const decodedToken = jwtHelper.decodeToken(token);
    return decodedToken;
  }
}
