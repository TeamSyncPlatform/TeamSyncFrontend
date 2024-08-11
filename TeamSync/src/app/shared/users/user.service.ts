import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "./models/user.model";
import {environment} from "../../core/env/env";
import {Group} from "../../feature/models/group/group.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'users')
  }

  get(id: String): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/' + id);
  }

  getByExternalId(id: string): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + 'users/external-id/' + id)
  }

  handleLogin(): Observable<User>{
    return this.httpClient.put<User>(environment.apiHost + 'users/login', {});
  }

  searchGroups(userId: string | null, searchValue: string): Observable<Group[]> {
    const url = `${environment.apiHost}users/${userId}/groups/search`;
    return this.httpClient.put<Group[]>(url, { searchValue });
  }
}
