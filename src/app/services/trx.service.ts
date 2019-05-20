import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonResponse } from '../models/common-response';
import { HttpClient} from '@angular/common/http';

import Vtrx from '../models/vtrx-model';
import TrxEntity from '../models/trx-model';

@Injectable({
  providedIn: 'root'
})
export class TrxService {

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
  getTransactions(): Observable<CommonResponse<Vtrx[]>>{
    return this.http.get<CommonResponse<Vtrx[]>>(`${this.baseUrl}/trx/${this.CIF}/transactions?access_token=${this.ACCESS_TOKEN}`);
  }

  // topup
  topup(trx: TrxEntity): Observable<CommonResponse<TrxEntity>>{
    return this.http.post<CommonResponse<TrxEntity>>(`${this.baseUrl}/trx/topup`, trx);
  }


  // transfeer
  transfer(trx: TrxEntity): Observable<CommonResponse<TrxEntity>>{
    return this.http.post<CommonResponse<TrxEntity>>(`${this.baseUrl}/trx/transfer`, trx);
  }

  
  // withdrawal
  withdrawal(trx: TrxEntity): Observable<CommonResponse<TrxEntity>>{
    return this.http.post<CommonResponse<TrxEntity>>(`${this.baseUrl}/trx/withdrawal`, trx);
  }
}
