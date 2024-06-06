import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { NilaiMataKuliah } from '../model/nilai-mata-kuliah';
import { User } from '../model/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class NilaiMataKuliahService {
  private url = 'http://localhost:4000/nilaimatakuliah';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<NilaiMataKuliah[]> {
    return this.http
      .get<NilaiMataKuliah[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  createNilaiMataKuliah(
    formData: Partial<NilaiMataKuliah>,
    userId: Pick<User, 'id'>
  ): Observable<NilaiMataKuliah> {
    return this.http
      .post<NilaiMataKuliah>(
        this.url,
        {
          nilai: formData.nilai,
          mataKuliah: formData.mataKuliah,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>(
            'createNilaiMataKuliah'
          )
        )
      );
  }

  deleteNilaiMataKuliah(
    idNilaiMataKuliah: Pick<NilaiMataKuliah, 'id'>
  ): Observable<{}> {
    return this.http
      .delete<NilaiMataKuliah>(
        `${this.url}/${idNilaiMataKuliah}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiMataKuliah>(
            'deleteNilaiMataKuliah'
          )
        )
      );
  }
}
