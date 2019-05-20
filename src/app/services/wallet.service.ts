import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CommonResponse } from '../models/common-response';
import { HttpClient} from '@angular/common/http';

import Vwallet from '../models/vwallet-model';
import Wallet  from '../models/wallet-model';
import WalletAccount from '../models/wallet-account-model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) { }

  CIF = localStorage.getItem("user");
  WID = localStorage.getItem("wallet");
  ACCESS_TOKEN = localStorage.getItem("act");;

  // baseUrl = "http://localhost:80/api/api/v1";
  baseUrl = "http://localhost:8080/api/v1";

  private _refresh = new Subject<void>();

  
  get refresh() {
    return this._refresh;
  }
  

  // get account customer profile
  getWallets(): Observable<CommonResponse<Vwallet[]>>{
    return this.http.get<CommonResponse<Vwallet[]>>(`${this.baseUrl}/customer/${this.CIF}/wallets?access_token=${this.ACCESS_TOKEN}`);
  }

   // get account customer profile
   getWallet(): Observable<CommonResponse<Vwallet>>{
    return this.http.get<CommonResponse<Vwallet>>(`${this.baseUrl}/customer/wallet/${Number(this.WID)}?access_token=${this.ACCESS_TOKEN}`);
  }


  // get account customer profile
  getWalletAccount(): Observable<CommonResponse<WalletAccount[]>>{
    return this.http.get<CommonResponse<WalletAccount[]>>(`${this.baseUrl}/customer/wallet/${Number(this.WID)}/accounts?access_token=${this.ACCESS_TOKEN}`);
  }


  // get wallet account by castag
  getWalletByCashtag(cashtag: string): Observable<CommonResponse<WalletAccount[]>>{
    return this.http.get<CommonResponse<WalletAccount[]>>(`${this.baseUrl}/customer/wallet/${cashtag}/accounts?access_token=${this.ACCESS_TOKEN}`);
  }


  // create wallet
  createWallet(wallet: Wallet): Observable<CommonResponse<Vwallet[]>>{
    return this.http.post<CommonResponse<Vwallet[]>>(`${this.baseUrl}/customer/${this.CIF}/wallet?access_token=${this.ACCESS_TOKEN}`, wallet);
  }
 
}
