import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { User } from '../model/user';
import { ErrorHandlerService } from './error-handler.service';
import { JudulPenelitian } from '../model/judul-penelitian';

@Injectable({
  providedIn: 'root',
})
export class JudulPenelitianService {
  private url = 'http://localhost:4000/judulpenelitianmahasiswa';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchAll(): Observable<JudulPenelitian[]> {
    return this.http
      .get<JudulPenelitian[]>(this.url, { responseType: 'json' })
      .pipe(
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian[]>(
            'fetchAll',
            []
          )
        )
      );
  }

  fetchById(
    idPengajuanJudulPenelitian: Pick<JudulPenelitian, 'id'>
  ): Observable<any> {
    return this.http
      .get<JudulPenelitian>(
        `${this.url}/${idPengajuanJudulPenelitian}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>('fetchById')
        )
      );
  }

  fetchByUserId(userId: number): Observable<any> {
    return this.http
      .get<JudulPenelitian>(
        `http://localhost:4000/middlewarejudulpenelitianmahasiswa/${userId}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>('fetchByUserId')
        )
      );
  }

  createJudulPenelitian(
    formData: Partial<JudulPenelitian>,
    userId: Pick<User, 'id'>
  ): Observable<JudulPenelitian> {
    return this.http
      .post<JudulPenelitian>(
        this.url,
        {
          namaJudulPenelitian: formData.namaJudulPenelitian,
          lokasiPenelitian: formData.lokasiPenelitian,
          idDosenPembimbing: formData.idDosenPembimbing,
          idPeminatan: formData.idPeminatan,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>(
            'createJudulPenelitian'
          )
        )
      );
  }

  deleteJudulPenelitian(
    idPengajuanJudulPenelitian: Pick<JudulPenelitian, 'id'>
  ): Observable<{}> {
    return this.http
      .delete<JudulPenelitian>(
        `${this.url}/${idPengajuanJudulPenelitian}`,
        this.httpOptions
      )
      .pipe(
        first(),
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>(
            'deleteJudulPenelitian'
          )
        )
      );
  }

  updateJudulPenelitian(
    formData: Partial<JudulPenelitian>,
    userId: Pick<User, 'id'>,
    idPengajuanJudulPenelitian: Pick<JudulPenelitian, 'id'>
  ): Observable<JudulPenelitian> {
    return this.http
      .patch<JudulPenelitian>(
        `${this.url}/${idPengajuanJudulPenelitian}`,
        {
          namaJudulPenelitian: formData.namaJudulPenelitian,
          lokasiPenelitian: formData.lokasiPenelitian,
          idDosenPembimbing: formData.idDosenPembimbing,
          idPeminatan: formData.idPeminatan,
          user: userId,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>(
            'updateJudulPenelitian'
          )
        )
      );
  }

  updateStatusPengajuanJudulPenelitian(
    status: string,
    userId: Pick<User, 'id'>
  ): Observable<JudulPenelitian> {
    return this.http
      .patch<JudulPenelitian>(
        `http://localhost:4000/middlewarejudulpenelitianmahasiswa/${userId}`,
        {
          status: status,
        },
        this.httpOptions
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian>(
            'updateStatusPengajuanJudulPenelitian'
          )
        )
      );
  }

  fetchByStatusNeedApproval(): Observable<any> {
    return this.http
      .get<JudulPenelitian[]>(
        `http://localhost:4000/middlewarejudulpenelitianmahasiswa`,
        { responseType: 'json' }
      )
      .pipe(
        catchError(
          this.errorHandlerService.handleError<JudulPenelitian[]>(
            'fetchByStatusNeedApproval',
            []
          )
        )
      );
  }
}
