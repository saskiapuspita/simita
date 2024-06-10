import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { Peminatan } from '../model/peminatan';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MasterPeminatanService {
  private url = 'http://localhost:4000/peminatan';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Peminatan[]> {
    return this.http
      .get<Peminatan[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<Peminatan[]>('fetchAll', []))
      );
  }

  fetchById(peminatanId: Pick<Peminatan, 'id'>): Observable<{}> {
    return this.http
      .get<Peminatan>(`${this.url}/${peminatanId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Peminatan>('getPeminatanById'))
      );
  }

  createPeminatan(formData: Partial<Peminatan>, userId: Pick<User, 'id'>): Observable<Peminatan> {
    return this.http
      .post<Peminatan>(
        this.url,
        {
          nama: formData.nama,
          user: userId
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Peminatan>('createPeminatan'))
      );
  }

  deletePeminatan(peminatanId: Pick<Peminatan, 'id'>): Observable<{}> {
    return this.http
      .delete<Peminatan>(`${this.url}/${peminatanId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Peminatan>('deletePeminatan'))
      );
  }

  updatePeminatan(
    formData: Partial<Peminatan>,
    peminatanId: Pick<Peminatan, 'id'>
  ): Observable<Peminatan> {
    return this.http
      .patch<Peminatan>(
        `${this.url}/${peminatanId}`,
        {
          nama: formData.nama,
          id: peminatanId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Peminatan>('updatePeminatan'))
      );
  }
}
