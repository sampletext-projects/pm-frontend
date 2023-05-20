import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TaskGetByProjectResponse} from "../interfaces/task-getbyproject-response.interface";
import {CreateTaskRequest} from "../interfaces/create-task-request.interface";
import {TaskStatus} from "../enums/task-status.enum";
import {TaskItem} from "../interfaces/task-item.interface";
import {EditTaskRequest} from "../interfaces/edit-task-request.interface";

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

  public getById(id: string): Observable<TaskItem> {
    return this.httpClient.get<TaskItem>(`${environment.baseUrl}/task/getbyid`, {
      params: {
        taskId: id
      }
    });
  }

  public create(request: CreateTaskRequest): Observable<{id: string}> {
    return this.httpClient.post<{id:string}>(`${environment.baseUrl}/task/create`, request);
  }

  public edit(request: EditTaskRequest): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/task/edit`, request);
  }

  public changeStatus(taskId: string, newStatus: TaskStatus): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/task/changeStatus`, {}, {
      params: {
        taskId: taskId,
        newStatus: newStatus
      }
    });
  }
}
