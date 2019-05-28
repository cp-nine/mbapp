import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { Customer } from '../models/customer-model';
import { CommonResponse } from '../models/common-response';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  CIF = localStorage.getItem("user");
  ACCESS_TOKEN = localStorage.getItem("act");;

  // baseUrl = "http://localhost:80/api/api/v1";
  baseUrl = "http://localhost:8080/api/v1";

  private _refresh = new Subject<void>();

  
  get refresh() {
    return this._refresh;
  }
  

  // get customer profile
  getCustomer(): Observable<CommonResponse<Customer>>{
    return this.http.get<CommonResponse<Customer>>(`${this.baseUrl}/customer/${this.CIF}?access_token=${this.ACCESS_TOKEN}`).pipe(catchError(this._handleError));
  }

  _handleError(error: HttpErrorResponse){    
    return throwError(error);
  }

  // createCustomer
  createCustomer(customer: Customer): Observable<CommonResponse<Customer>>{
    return this.http.post<CommonResponse<Customer>>(`${this.baseUrl}/customer`, customer);
  }
    

}
