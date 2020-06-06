import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverRoute = "http://161.35.172.113:8080/";
  constructor(private rest: HttpClient) { }
  solve(method: string, matrix: number[][]): Observable<any> {
    return this.rest.post(this.serverRoute + method, 
      matrix.map(row => row.join(",")).join("|")
    )
  }
}
