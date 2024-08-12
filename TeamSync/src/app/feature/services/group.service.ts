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

  get(id: String): Observable<Group> {
    return this.httpClient.get<Group>(environment.apiHost + 'groups/' + id);
  }

  create(createGroupRequest: CreateGroupRequest) : Observable<Group>{
    return this.httpClient.post<Group>(environment.apiHost + 'groups', createGroupRequest);
  }

  isNameUnique(groupName: string) : Observable<Boolean>{
    return this.httpClient.get<Boolean>(environment.apiHost + 'groups/unique/' + groupName);
  }

}
