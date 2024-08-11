import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../models/group/group.model";
import {environment} from "../../core/env/env";
import {Channel} from "../models/channel.model";

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Channel[]> {
    return this.httpClient.get<Channel[]>(environment.apiHost + 'channels')
  }

  get(id: String): Observable<Channel> {
    return this.httpClient.get<Channel>(environment.apiHost + 'channels/' + id);
  }
}
