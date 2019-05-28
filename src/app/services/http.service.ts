import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import AuthToken from '../models/auth-token-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBase64token(){
    return "SUtIU0FOOkxJSEFUX0RPTkc=";
  }

  // grefresh token 
  refreshToken(): Observable<AuthToken>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })};
    let body = "grant_type=refresh_token";

    return this.http.post<AuthToken>(`http://localhost:80/api/oauth/token`, body, httpOptions);
  }
}
