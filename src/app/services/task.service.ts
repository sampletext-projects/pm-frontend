import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectExploreResponse} from "../interfaces/project-explore-response.interface";
import {environment} from "../../environments/environment";
import {TaskGetByProjectResponse} from "../interfaces/task-getbyproject-response.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) {
  }

  public getByProject(id: string): Observable<TaskGetByProjectResponse> {
    return this.httpClient.post<TaskGetByProjectResponse>(`${environment.baseUrl}/task/getbyproject`, {},{
      params: {
        projectId: id
      }
    });
  }
}
