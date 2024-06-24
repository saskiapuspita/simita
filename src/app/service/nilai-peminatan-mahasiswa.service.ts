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

  fetchNamaPeminatanNamaMatkulNilai(
    userId: number
  ): Observable<NilaiPeminatanMahasiswa[]> {
    return this.http
      .get<NilaiPeminatanMahasiswa[]>(
        `http://localhost:4000/middlewarenilaipeminatanmahasiswa/${userId}`,
        this.httpOptions
      )
      .pipe(
        first(),
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
    return this.http
      .post<NilaiPeminatanMahasiswa>(
        this.url,
        {
          idPeminatan: formData.idPeminatan,
          urutanMinat: formData.urutanMinat,
          idMatkul1: formData.idMatkul1,
          nilaiMatkul1: formData.nilaiMatkul1,
          idMatkul2: formData.idMatkul2,
          nilaiMatkul2: formData.nilaiMatkul2,
          idMatkul3: formData.idMatkul3,
          nilaiMatkul3: formData.nilaiMatkul3,
          idMatkul4: formData.idMatkul4,
          nilaiMatkul4: formData.nilaiMatkul4,
          idMatkul5: formData.idMatkul5,
          nilaiMatkul5: formData.nilaiMatkul5,
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

  updateIsFinalSubmit(
    formData: Partial<NilaiPeminatanMahasiswa>,
    idNilaiPeminatanMahasiswa: Pick<NilaiPeminatanMahasiswa, 'id'>
  ): Observable<NilaiPeminatanMahasiswa> {
    var intFinalSubmit = formData.isFinalSubmit ? 1 : 0;
    return this.http
      .patch<NilaiPeminatanMahasiswa>(
        `${this.url}/${idNilaiPeminatanMahasiswa}`,
        {
          isFinalSubmit: intFinalSubmit,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<NilaiPeminatanMahasiswa>(
            'updateIsFinalSubmit'
          )
        )
      );
  }
}
