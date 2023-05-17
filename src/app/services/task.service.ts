import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TaskGetByProjectResponse} from "../interfaces/task-getbyproject-response.interface";
import {CreateTaskRequest} from "../interfaces/create-task-request.interface";

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

  public create(request: CreateTaskRequest): Observable<{id: string}> {
    return this.httpClient.post<{id:string}>(`${environment.baseUrl}/task/create`, request);
  }
}
