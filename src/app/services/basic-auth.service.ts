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
    const refreshToken = localStorage.getItem("rsh");

    if (token) {
      request = request.clone({
        params: request.params.set('access_token', token)
      });
    } else {
      request = request.clone({
        headers: request.headers.set('Authorization', `Basic ${this.httpService.getBase64token()}`),
        params: request.params.set('refresh_token', refreshToken)
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
        if(error.status == 401){
          localStorage.removeItem("act");
          this.httpService.refreshToken().subscribe(
            resp => {
              console.log(resp),
              localStorage.setItem("act", resp.access_token);
              localStorage.setItem("newtoken", resp.access_token);
            }            
          );
        }         
          return throwError(error);
      })
    );
  }
}
