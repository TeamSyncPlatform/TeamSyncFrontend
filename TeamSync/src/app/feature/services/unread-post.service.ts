import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../core/env/env";

@Injectable({
  providedIn: 'root'
})
export class UnreadPostService {

  private baseUrl = `${environment.apiHost}unread-posts`;

  constructor(private http: HttpClient) {}

  getUnreadPostsCount(userId: number, channelId: number): Observable<number> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('channelId', channelId.toString());

    return this.http.get<number>(`${this.baseUrl}/count`, { params });
  }

  updateLastReadTimestamp(userId: number, channelId: number): Observable<void> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('channelId', channelId.toString());
    return this.http.put<void>(`${this.baseUrl}/update-last-read`, null, { params });
  }
}
