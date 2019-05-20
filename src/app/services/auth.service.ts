import { Injectable } from '@angular/core';
import LoginModel from '../models/login-model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import AuthToken from '../models/auth-token-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  
  // get token 
  getToken(user: LoginModel): Observable<AuthToken>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic SUtIU0FOOkxJSEFUX0RPTkc=',
        'Content-Type':  'application/x-www-form-urlencoded'
      })};

    let grantType = "password"; 
    let body = "username="+user.username+"&password="+user.password+"&grant_type="+grantType;

    return this.http.post<AuthToken>(`http://localhost:80/api/oauth/token`, body, httpOptions);
  }


  isLogin(){
    if(localStorage.getItem("user") !== null){
      return false;
    } else {
      return true;
    }
  }
  
}
