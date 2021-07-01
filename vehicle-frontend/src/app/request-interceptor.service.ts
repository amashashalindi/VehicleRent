import { throwError as observableThrowError, Observable, BehaviorSubject } from 'rxjs';

import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse
} from "@angular/common/http";
import { Constants } from './constants';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  tokens: any;

  constructor(private injector: Injector, private router: Router) { }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (req.headers.has(Constants.CONTENT_TYPES.X_SKIP_INTERCEPTOR)) {
      const headers = req.headers.delete(
        Constants.CONTENT_TYPES.X_SKIP_INTERCEPTOR
      );
      return next.handle(req.clone({ headers }));
    } else {
      return next.handle(req).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case 400:
                return this.handle400Error(error);
              case 401:
                return this.handle401Error(req, next);
              default:
                return observableThrowError(error);
            }
          } else {
            return observableThrowError(error);
          }
        })
      );
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser();
    }

    return observableThrowError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(req);
        }));
    }
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    // localStorage.removeItem(Constants.ACCESS_TOKEN);
    // localStorage.removeItem(Constants.REFRESH_TOKEN);
    this.router.navigate(['login']);
    return 'success';
  }

}