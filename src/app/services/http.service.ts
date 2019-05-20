import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getBase64token(){
    return "SUtIU0FOOkxJSEFUX0RPTkc=";
  }
}
