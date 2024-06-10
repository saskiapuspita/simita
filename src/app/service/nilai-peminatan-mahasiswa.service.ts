import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../model/user';
import { ErrorHandlerService } from './error-handler.service';
import { NilaiPeminatanMahasiswa } from '../model/nilai-peminatan-mahasiswa';

@Injectable({
  providedIn: 'root',
})
export class NilaiPeminatanMahasiswaService {
  private url = 'http://localhost:4000/nilaipeminatanmahasiswa';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<NilaiPeminatanMahasiswa[]> {
    return this.http
      .get<NilaiPeminatanMahasiswa[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  fetchByUserId(userId: Pick<User, 'id'>): Observable<{}> {
    return this.http
      .get<NilaiPeminatanMahasiswa>(`${this.url}/${userId}`, this.httpOptions)
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa>(
            'fetchByUserId'
          )
        )
      );
  }

  fetchNamaPeminatanNamaMatkulNilai(): Observable<NilaiPeminatanMahasiswa[]> {
    return this.http
      .get<NilaiPeminatanMahasiswa[]>(
        'http://localhost:4000/middlewarenilaipeminatanmahasiswa',
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa[]>(
            'fetchNamaPeminatanNamaMatkulNilai',
            []
          )
        )
      );
  }

  createNilaiPeminatanMahasiswa(
    formData: Partial<NilaiPeminatanMahasiswa>,
    userId: Pick<User, 'id'>
  ): Observable<NilaiPeminatanMahasiswa> {
    console.log("form data idPeminatan: " + formData.idPeminatan);
    console.log("form data urutanMinat: " + formData.urutanMinat);
    console.log("form data idMatkul: " + formData.idMatkul);
    console.log("form data nilai: " + formData.nilai);
    console.log("form data user: " + userId);
    return this.http
      .post<NilaiPeminatanMahasiswa>(
        this.url,
        {
          idPeminatan: formData.idPeminatan,
          urutanMinat: formData.urutanMinat,
          idMatkul: formData.idMatkul,
          nilai: formData.nilai,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa>(
            'createNilaiPeminatanMahasiswa'
          )
        )
      );
  }

  deleteNilaiPeminatanMahasiswa(
    idNilaiPeminatanMahasiswa: Pick<NilaiPeminatanMahasiswa, 'id'>
  ): Observable<{}> {
    return this.http
      .delete<NilaiPeminatanMahasiswa>(
        `${this.url}/${idNilaiPeminatanMahasiswa}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa>(
            'deleteNilaiPeminatanMahasiswa'
          )
        )
      );
  }
}
