import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../models/post/post.model";
import {environment} from "../../core/env/env";
import {User} from "../../shared/users/models/user.model";
import {ActiveUserDTO} from "./active-user-dto.model";
import {GroupPostsDTO} from "./group-posts-dto.model";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) {}

  getMostPopularPosts(period: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiHost}analytics/most-popular-posts/${period}`);
  }

  getMostActiveUsers(groupId: number, period: string): Observable<ActiveUserDTO[]> {
    return this.http.get<ActiveUserDTO[]>(`${environment.apiHost}analytics/most-active-users/${groupId}/${period}`);
  }

  getGroupPostsStats(period: string): Observable<GroupPostsDTO[]> {
    return this.http.get<GroupPostsDTO[]>(`${environment.apiHost}analytics/group-posts-stats/${period}`);
  }
}
