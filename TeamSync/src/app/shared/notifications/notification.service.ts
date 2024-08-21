import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../core/env/env";
import {Notification} from "./models/notification.model";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private httpClient: HttpClient) {
  }

  getAllByUser(userId: number): Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(environment.apiHost + 'notifications/user/' + userId);
  }

  getUnreadCountByUser(userId: number): Observable<number>{
    return this.httpClient.get<number>(`${environment.apiHost}notifications/user/${userId}/unread-count`);
  }

  readNotification(notificationId: number): Observable<Notification>{
    return this.httpClient.put<Notification>(`${environment.apiHost}notifications/${notificationId}/read`, {});
  }

  readAllByUser(userId: number): Observable<Notification[]> {
    return this.httpClient.put<Notification[]>(`${environment.apiHost}notifications/user/${userId}/read`, {});
  }


}
