import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ParticipantGetByProjectResponse} from "../interfaces/participant-getbyproject-response.interface";
import {ChangeUserRoleRequest} from "../interfaces/change-user-role-request.interface";

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private httpClient: HttpClient) {
  }

  public getByProject(id: string): Observable<ParticipantGetByProjectResponse> {
    return this.httpClient.get<ParticipantGetByProjectResponse>(`${environment.baseUrl}/participant/GetByProject`, {
      params: {
        projectId: id
      }
    });
  }

  public changeRole(request: ChangeUserRoleRequest): Observable<{}> {
    return this.httpClient.post<{}>(`${environment.baseUrl}/participant/changeRole`, request);
  }

}
