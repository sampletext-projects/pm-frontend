import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginRequest} from "../interfaces/login-request.interface";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../interfaces/login-response.interface";
import {RegisterRequest} from "../interfaces/register-request.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _token: string = ''

  set token(token: string) {
    this._token = token
    localStorage.setItem('token', this._token)
  }

  get token(): string {
    if (!this._token) {
      this._token = localStorage.getItem('token') || ''
    }
    return this._token
  }

  private _refreshToken: string = ''

  set refreshToken(token: string) {
    this._refreshToken = token
    localStorage.setItem('refreshToken', this._refreshToken)
  }

  get refreshToken(): string {
    if (!this._refreshToken) {
      this._refreshToken = localStorage.getItem('refreshToken') || ''
    }
    return this._refreshToken
  }

  constructor(private httpClient: HttpClient) {
  }

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/auth/login`, request)
      .pipe(tap(response => {
        this.token = response.token;
        this.refreshToken = response.refreshToken;
      }));
  }

  public register(request: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/auth/login`, request);
  }

  public doRefreshToken(): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${environment.baseUrl}/auth/refreshToken`, {});
  }
}
