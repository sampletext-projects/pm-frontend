import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ParticipantGetByProjectResponse} from "../interfaces/participant-getbyproject-response.interface";
import {environment} from "../../environments/environment";
import {CommentGetByProjectResponse} from "../interfaces/comment-getbyproject-response.interface";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) {
  }

  public getByProject(id: string): Observable<CommentGetByProjectResponse> {
    return this.httpClient.get<CommentGetByProjectResponse>(`${environment.baseUrl}/comment/GetByProject`, {
      params: {
        projectId: id
      }
    });
  }

  public createForProject(projectId: string, content: string): Observable<{}> {
    return this.httpClient.post<{}>(`${environment.baseUrl}/comment/createForProject`, {
      projectId: projectId,
      content: content
    });
  }
}
