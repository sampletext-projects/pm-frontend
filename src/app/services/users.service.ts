import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectExploreResponse} from "../interfaces/project-explore-response.interface";
import {environment} from "../../environments/environment";
import {SearchUsersResponse} from "../interfaces/search-users-response.interface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) {
  }

  public search(query: string): Observable<SearchUsersResponse> {
    return this.httpClient.get<SearchUsersResponse>(`${environment.baseUrl}/users/search`, {
      params: {
        query: query
      }
    });
  }

}
