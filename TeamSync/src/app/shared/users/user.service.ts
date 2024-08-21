import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./models/user.model";
import {environment} from "../../core/env/env";
import {Group} from "../../feature/models/group/group.model";
import {Post} from "../../feature/models/post/post.model";
import {UpdateUserDTO} from "./models/update-user-dto.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  get(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id);
  }

  update(user: UpdateUserDTO) : Observable<User>{
    return this.httpClient.put<User>(environment.apiHost + 'users', user);
  }

  getByExternalId(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/external-id/' + id)
  }

  getByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/email/' + email)
  }

  handleLogin(): Observable<User>{
    return this.httpClient.put<User>(environment.apiHost + 'users/login', {});
  }

  searchGroups(userId: string | null, searchValue: string): Observable<Group[]> {
    const url = `${environment.apiHost}users/${userId}/groups/search`;
    return this.httpClient.put<Group[]>(url, { searchValue });
  }

  searchUsersToAdd(groupId: any, searchValue: string): Observable<User[]>  {
    const url = `${environment.apiHost}users/groups/${groupId}/search`;
    return this.httpClient.put<User[]>(url, { searchValue });
  }

  uploadProfileImage(userId: number, file: FormData): Observable<User> {
    return this.httpClient.post<User>(`${environment.apiHost}users/${userId}/upload-image`, file);
  }

  getProfileImage(imageId: number): Observable<Blob> {
    return this.httpClient.get(`${environment.apiHost}users/image/${imageId}`, { responseType: 'blob' });
  }

  toggleNotification(userId: number, notificationType: string): Observable<User> {
    const url = `${environment.apiHost}users/${userId}/toggle-notification`;
    return this.httpClient.put<User>(url, {}, { params: { notificationType } });
  }
}
