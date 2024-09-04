import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../models/group/group.model";
import {environment} from "../../core/env/env";
import {Channel} from "../models/channel/channel.model";
import {CreateGroupRequest} from "../models/group/create-group-request.model";
import {CreateChannelRequest} from "../models/channel/create-channel-request";
import {Post} from "../models/post/post.model";

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

  create(createChannelRequest: CreateChannelRequest) : Observable<Channel>{
    return this.httpClient.post<Channel>(environment.apiHost + 'channels', createChannelRequest);
  }

  isNameUnique(channelName: string) : Observable<Boolean>{
    return this.httpClient.get<Boolean>(environment.apiHost + 'channels/unique/' + channelName);
  }

  remove(id: number): Observable<Channel>  {
    return this.httpClient.delete<Channel>(environment.apiHost + 'channels/' + id);
  }

  getChannelPosts(id: number): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiHost + 'channels/' + id + '/posts')
  }

}
