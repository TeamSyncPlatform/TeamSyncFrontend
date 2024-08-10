import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {User} from "../../shared/users/models/user.model";
import {environment} from "../../core/env/env";
import {Group} from "../models/group.model";
import {Channel} from "../models/channel.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Group[]> {
    return this.httpClient.get<Group[]>(environment.apiHost + 'groups')
  }

  get(id: String): Observable<Group> {
    return this.httpClient.get<Group>(environment.apiHost + 'groups/' + id);
  }

  getAllDummy(): Observable<Group[]> {
      const channels1: Channel[] = [
        { id: 1, name: 'General', group: { id: 1}, posts: [] },
        { id: 2, name: 'Announcements', group: { id: 1}, posts: [] },
        { id: 3, name: 'Development', group: { id: 1}, posts: [] },
      ];

    const channels2: Channel[] = [
      { id: 1, name: 'General', group: { id: 2}, posts: [] },
      { id: 2, name: 'Announcements', group: { id: 2}, posts: [] },
      { id: 3, name: 'Development', group: { id: 2}, posts: [] },
    ];

      const dummyGroups: Group[] = [
        {
          id: 1,
          name: 'Group 1',
          channels: channels1,
          members: [],
        },
        {
          id: 2,
          name: 'Group 2',
          channels: channels2,
          members: [],
        },
      ];
    // Return the dummy groups wrapped in an Observable
    return of(dummyGroups);
  }

}
