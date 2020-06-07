import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverRoute = 'http://161.35.172.113:8080/';
  err: string;
  constructor(private rest: HttpClient) { }
  solve(method: string, matrix: number[][]): Observable<any> {
    return this.rest.post(this.serverRoute + method,
      matrix.map(row => row.join(',')).join('|')
    ).pipe(
      tap(() => this.err = null),
      catchError((err: HttpErrorResponse) => {
        if (err.error === 'ERR-0'){
          this.err = 'Детерминант равен 0';
        } else if (err.error === 'ERR-SIZE'){
          this.err = 'Неподдерживаемый размер матрицы';
        } else if (err.error === 'ERR-VSIZE'){
          this.err = 'Неподдерживаемый размер матрицы для метода Вороного';
        } else {
          this.err = 'Неожиданная ошибка';
        }
        return throwError(err);
      })
    );
  }
}
