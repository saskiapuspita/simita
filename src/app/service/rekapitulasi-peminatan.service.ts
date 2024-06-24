import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

import { ErrorHandlerService } from './error-handler.service';
import { RekapitulasiPeminatan } from '../model/rekapitulasi-peminatan';

@Injectable({
  providedIn: 'root'
})
export class RekapitulasiPeminatanService {
  private url = 'http://localhost:4000/rekapitulasipeminatan';

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  fetchRekapitulasiPeminatanProter(): Observable<RekapitulasiPeminatan[]> {
    return this.http
      .get<RekapitulasiPeminatan[]>(`${this.url}/rekapitulasipeminatanproter`, { responseType: 'json' })
      .pipe(
        catchError(this.errorHandlerService.handleError<RekapitulasiPeminatan[]>('fetchRekapitulasiPeminatanProter', []))
      );
  }
}
