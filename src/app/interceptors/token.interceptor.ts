import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, retry, tap, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  isRefreshing = false

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this._authService.token !== '') {
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.isRefreshing ? this._authService.refreshToken : this._authService.token}`
        }
      })
    }

    return next.handle(req)
      .pipe(
        catchError((error, caught) => {
          if (error.status === 401 && !this.isRefreshing) {
            console.log("refreshing token")
            this.isRefreshing = true
            this._authService.doRefreshToken()
              .subscribe({
                next: response => {
                  this._authService.token = response.token;
                  this._authService.refreshToken = response.refreshToken
                  console.log("refreshed token")
                  this.isRefreshing = false

                },
                error: error => {
                  if (error.status === 401) {
                    this._router.navigate(['auth', 'login'])
                  }
                }
              });
          }
          return throwError(() => new Error("exception here motherfucker"))
        })
      )
  }

}
