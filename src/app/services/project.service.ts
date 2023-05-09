import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginRequest} from "../interfaces/login-request.interface";
import {environment} from "../../environments/environment";
import {LoginResponse} from "../interfaces/login-response.interface";
import {ProjectExploreResponse} from "../interfaces/project-explore-response.interface";
import {CreateProjectRequest} from "../interfaces/create-project-request.interface";
import {ProjectGetByIdResponse} from "../interfaces/project-getbyid-response.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httpClient: HttpClient) {
  }

  public explore(): Observable<ProjectExploreResponse> {
    return this.httpClient.get<ProjectExploreResponse>(`${environment.baseUrl}/project/explore`);
  }

  public create(request: CreateProjectRequest): Observable<{id: string}> {
    return this.httpClient.post<{id: string}>(`${environment.baseUrl}/project/create`, request);
  }

  public join(id: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/project/join`, {}, {
      params: {
        projectId: id
      }
    });
  }

  public getById(id: string): Observable<ProjectGetByIdResponse> {
    return this.httpClient.get<ProjectGetByIdResponse>(`${environment.baseUrl}/project/getbyid`,  {
      params: {
        projectId: id
      }
    });
  }
}
