import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable, NgZone} from "@angular/core";
import {Router} from "@angular/router";
import {mergeMap, Observable, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class RequestsInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private matSnackBar: MatSnackBar,
    private _zone: NgZone,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("Handling " + req.url)
    if (this._authService.token !== '') {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${req.url.endsWith('refreshToken') ? this._authService.refreshToken : this._authService.token}`
        }
      })
    }

    return next.handle(req)
      .pipe(
        catchError((error, caught) => {
          // console.log('handling http error', error)
          if (error.status === 401 && req.url.endsWith('refreshToken')) {
            this._router.navigate(['auth', 'login'])
            return throwError(() => new Error("Unauthorized"))
          } else if (error.status === 401) {
            return this._authService.doRefreshToken()
              .pipe(
                tap(response => {
                  this._authService.token = response.token;
                  this._authService.refreshToken = response.refreshToken;
                }),
                mergeMap(() => {
                  return this.intercept(req.clone(), next)
                })
              )
          } else if (error.status === 400) {
            // мы точно знаем, в каком формате бэк возвращает ошибки
            // console.log('opening snackbar')
            this.matSnackBar.open(error.error.error, '', {duration: 3000, panelClass: ['snackbar-default']});
            return throwError(error);
          } else {
            // console.log("catched a general error")
            return throwError(() => error)
          }
        })
      )
  }

}
