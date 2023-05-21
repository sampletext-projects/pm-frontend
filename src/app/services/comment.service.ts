import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParticipantGetByProjectResponse} from "../interfaces/participant-getbyproject-response.interface";
import {environment} from "../../environments/environment";
import {CommentGetResponse} from "../interfaces/comment-getbyproject-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  public getByProject(id: string): Observable<CommentGetResponse> {
    return this.httpClient.get<CommentGetResponse>(`${environment.baseUrl}/comment/GetByProject`, {
      params: {
        projectId: id
      }
    });
  }

  public getByTask(id: string): Observable<CommentGetResponse> {
    return this.httpClient.get<CommentGetResponse>(`${environment.baseUrl}/comment/GetByTask`, {
      params: {
        taskId: id
      }
    });
  }

  public createForProject(projectId: string, content: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/comment/createForProject`, {
      projectId: projectId,
      content: content
    });
  }

  public createForTask(taskId: string, content: string): Observable<void> {
    return this.httpClient.post<void>(`${environment.baseUrl}/comment/createForTask`, {
      taskId: taskId,
      content: content
    });
  }
}
