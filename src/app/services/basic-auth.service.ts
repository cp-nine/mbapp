import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable, throwError } from 'rxjs';
import {map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthService implements HttpInterceptor {

  constructor(private httpService: HttpService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercept request ..');
    console.log(`Current headers : ${JSON.stringify(request.headers)}`);
    
    const token = localStorage.getItem("act");

    if (token) {
      request = request.clone({
        params: request.params.set('access_token', token)
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Authorization', `Basic ${this.httpService.getBase64token()}`)
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        } 
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
          data = {
              reason: error && error.error.reason ? error.error.reason : '',
              status: error.status
          };
          console.log("Error: "+ JSON.stringify(data));          
          return throwError(error);
      })
    );
  }
}
