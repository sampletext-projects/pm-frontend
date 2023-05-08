import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../interfaces/login-request.interface";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../interfaces/login-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }

  public explore(): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/project/explore`);
  }
}
