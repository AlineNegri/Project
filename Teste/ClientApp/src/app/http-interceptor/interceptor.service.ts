import { Injectable } from '@angular/core';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
}
  from '@angular/common/http';
import { Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { AuthService } from '../login/auth.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);

    if (this.authService.bearer) {
      // request.headers.append("Authorization", `Bearer ${this.authService.bearer}`);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.bearer}`
        }
      })
    }

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.message);
          console.log(error.error);
          return throwError(error);
        })
      );
  }

}
