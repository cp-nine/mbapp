import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer-model';
import { CommonResponse } from '../models/common-response';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import { Account } from '../models/account-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  CIF = localStorage.getItem("user");
  ACCESS_TOKEN = localStorage.getItem("act");;

  baseUrl = "http://localhost:80/api/api/v1";
  // baseUrl = "http://localhost:8080/api/v1";

  private _refresh = new Subject<void>();

  
  get refresh() {
    return this._refresh;
  }
  

  // get account customer profile
  getAccounts(): Observable<CommonResponse<Account[]>>{
    return this.http.get<CommonResponse<Account[]>>(`${this.baseUrl}/customer/${this.CIF}/accounts?access_token=${this.ACCESS_TOKEN}`);
  }


  // get account by id
  getAccountById(id: number): Observable<CommonResponse<Account>>{
    return this.http.get<CommonResponse<Account>>(`${this.baseUrl}/customer/account/${id}`);
  }


  // create account
  createAccount(account: Account): Observable<CommonResponse<Account>>{
    return this.http.post<CommonResponse<Account>>(`${this.baseUrl}/customer/account?access_token=${this.ACCESS_TOKEN}`, account);
  }

 
}
