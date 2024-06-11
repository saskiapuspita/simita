import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { Dosen } from '../model/dosen';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MasterDosenService {
  private url = 'http://localhost:4000/dosen';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<Dosen[]> {
    return this.http
      .get<Dosen[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<Dosen[]>('fetchAll', [])
        )
      );
  }

  fetchById(dosenId: number): Observable<any> {
    return this.http
      .get<Dosen>(`${this.url}/${dosenId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Dosen>('getDosenById'))
      );
  }

  createDosen(formData: Partial<Dosen>): Observable<Dosen> {
    return this.http
      .post<Dosen>(
        this.url,
        {
          name: formData.name,
          email: formData.email,
          nidn: formData.nidn,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen>('createDosen'))
      );
  }

  deleteDosen(dosenId: Pick<Dosen, 'id'>): Observable<{}> {
    return this.http
      .delete<Dosen>(`${this.url}/${dosenId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<Dosen>('deleteDosen'))
      );
  }

  updateDosen(
    formData: Partial<Dosen>,
    dosenId: Pick<Dosen, 'id'>
  ): Observable<Dosen> {
    return this.http
      .patch<Dosen>(
        `${this.url}/${dosenId}`,
        {
          name: formData.name,
          email: formData.email,
          nidn: formData.nidn,
        },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<Dosen>('updateDosen'))
      );
  }
}
