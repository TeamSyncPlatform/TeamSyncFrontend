import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {map} from "rxjs/operators";
import {AuthenticationService} from "./authentication.service";
import {isPlatformBrowser} from "@angular/common";
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      // Only access localStorage if in the browser
      accessToken = sessionStorage.getItem('access_token');
    }

    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      accessToken = accessToken.replace(/"/g, '');
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          // if (event instanceof HttpResponse) {
          //   const isTokenExpired = this.isTokenExpired(event);
          //   if (isTokenExpired) {
          //     this.authenticationService.signout();
          //   }
          // }
          return event;
        }),
        catchError((error) => {
          // if (error.status === 401 || error.status === 403) {
          //   this.authenticationService.signout();
          // }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  // private isTokenExpired(response: HttpResponse<any>): boolean {
  //   const expirationTime = this.authenticationService.getExpiration();
  //   const currentTime = new Date().getTime();
  //
  //   if (expirationTime) {
  //     return expirationTime*1000 < currentTime;
  //   }
  //
  //   return false;
  // }
}
