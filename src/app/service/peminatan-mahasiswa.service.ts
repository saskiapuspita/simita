import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { PeminatanMahasiswa } from '../model/peminatan-mahasiswa';
import { User } from '../model/user';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PeminatanMahasiswaService {

  private url = 'http://localhost:4000/peminatanmahasiswa';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<PeminatanMahasiswa[]> {
    return this.http
      .get<PeminatanMahasiswa[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<PeminatanMahasiswa[]>('fetchAll', []))
      );
  }

  createPeminatanMahasiswa(
    formData: Partial<PeminatanMahasiswa>,
    userId: Pick<User, 'id'>
  ): Observable<PeminatanMahasiswa> {
    return this.http
      .post<PeminatanMahasiswa>(
        this.url,
        { ipk: formData.ipk, pilihanPeminatan: formData.pilihanPeminatan, user: userId },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandlerService.handleError<PeminatanMahasiswa>('createPeminatanMahasiswa'))
      );
  }

  deletePeminatanMahasiswa(idPeminatanMahasiswa: Pick<PeminatanMahasiswa, 'id'>): Observable<{}> {
    return this.http
      .delete<PeminatanMahasiswa>(`${this.url}/${idPeminatanMahasiswa}`, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandlerService.handleError<PeminatanMahasiswa>('deletePeminatanMahasiswa'))
      );
  }
}
