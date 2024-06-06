import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { MataKuliah } from '../model/mata-kuliah';
import { User } from '../model/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class MataKuliahService {
  private url = 'http://localhost:4000/matakuliah';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<MataKuliah[]> {
    return this.http
      .get<MataKuliah[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MataKuliah[]>('fetchAll', [])
        )
      );
  }

  createMataKuliah(
    formData: Partial<MataKuliah>,
    userId: Pick<User, 'id'>
  ): Observable<MataKuliah> {
    return this.http
      .post<MataKuliah>(
        this.url,
        { nama: formData.nama, sks: formData.sks, minat: formData.minat, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('createMataKuliah')
        )
      );
  }

  deleteMataKuliah(mataKuliahId: Pick<MataKuliah, 'id'>): Observable<{}> {
    return this.http
      .delete<MataKuliah>(`${this.url}/${mataKuliahId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<MataKuliah>('deleteMataKuliah')
        )
      );
  }
}
