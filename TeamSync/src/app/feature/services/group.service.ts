import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../../shared/users/models/user.model";
import {environment} from "../../core/env/env";
import {Group} from "../models/group/group.model";
import {Channel} from "../models/channel/channel.model";
import {CreateGroupRequest} from "../models/group/create-group-request.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(environment.apiHost + 'groups')
  }

  getGroupChannels(id: number): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(environment.apiHost + 'groups/' + id + '/channels')
  }

  get(id: number): Observable<Group> {
    return this.httpClient.get<Group>(environment.apiHost + 'groups/' + id);
  }

  create(createGroupRequest: CreateGroupRequest) : Observable<Group>{
    return this.httpClient.post<Group>(environment.apiHost + 'groups', createGroupRequest);
  }

  isNameUnique(groupName: string) : Observable<Boolean>{
    return this.httpClient.get<Boolean>(environment.apiHost + 'groups/unique/' + groupName);
  }

  remove(id: number): Observable<Group>  {
    return this.httpClient.delete<Group>(environment.apiHost + 'groups/' + id);
  }

  getMembers(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiHost + 'groups/' + id + '/members');
  }

  addMember(groupId: number, userId: number): Observable<void> {
   return this.httpClient.put<void>(environment.apiHost + 'groups/' + groupId + '/members/' + userId, {})
  }

  removeMember(groupId: number, userId: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost + 'groups/' + groupId + '/members/' + userId, {})
  }

  searchGroupMembersForDeletion(groupId: any, searchValue: string): Observable<User[]>  {
    const url = `${environment.apiHost}groups/${groupId}/members/search`;
    return this.httpClient.put<User[]>(url, { searchValue });
  }

}

