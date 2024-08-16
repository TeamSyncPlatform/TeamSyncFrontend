import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "../models/channel/channel.model";
import {environment} from "../../core/env/env";
import {CreateChannelRequest} from "../models/channel/create-channel-request";
import {CreateCommentRequest} from "../models/comment/create-comment-request.model";
import {Reaction} from "../models/reaction/reaction.model";
import {Post} from "../models/post/post.model";
import {Comment} from "../models/comment/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(environment.apiHost + 'comments')
  }

  get(id: String): Observable<Comment> {
    return this.httpClient.get<Comment>(environment.apiHost + 'comments/' + id);
  }

  create(createCommentRequest: CreateCommentRequest) : Observable<Comment>{
    return this.httpClient.post<Comment>(environment.apiHost + 'comments', createCommentRequest);
  }

  addReaction(commentId: number, reaction: Reaction): Observable<Comment> {
    return this.httpClient.post<Comment>(`${environment.apiHost}comments/${commentId}/reactions`, reaction);
  }

  removeReaction(commentId: number, reaction: Reaction): Observable<Comment> {
    return this.httpClient.delete<Comment>(`${environment.apiHost}comments/${commentId}/reactions`, { body: reaction });
  }
}
