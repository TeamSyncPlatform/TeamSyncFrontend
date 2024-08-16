import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Group} from "../models/group/group.model";
import {environment} from "../../core/env/env";
import {Channel} from "../models/channel/channel.model";
import {CreateGroupRequest} from "../models/group/create-group-request.model";
import {User} from "../../shared/users/models/user.model";
import {Post} from "../models/post/post.model";
import {CreatePostRequest} from "../models/post/create-post-request.model";
import {Reaction} from "../models/reaction/reaction.model";
import {Attachment} from "../models/attachment/attachment-dto.model";
import {Comment} from "../models/comment/comment.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(environment.apiHost + 'posts')
  }

  get(id: number): Observable<Post> {
    return this.httpClient.get<Post>(environment.apiHost + 'posts/' + id);
  }

  update(post: Post) : Observable<Post>{
    return this.httpClient.put<Post>(environment.apiHost + 'posts', post);
  }

  remove(id: number) : Observable<Post>{
    return this.httpClient.delete<Post>(environment.apiHost + 'posts/' + id);
  }

  create(createPostRequest: CreatePostRequest) : Observable<Post>{
    return this.httpClient.post<Post>(environment.apiHost + 'posts', createPostRequest);
  }

  addReaction(postId: number, reaction: Reaction): Observable<Post> {
    return this.httpClient.post<Post>(`${environment.apiHost}posts/${postId}/reactions`, reaction);
  }

  removeReaction(postId: number, reaction: Reaction): Observable<Post> {
    return this.httpClient.delete<Post>(`${environment.apiHost}posts/${postId}/reactions`, { body: reaction });
  }

  getPostAttachments(postId : number): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(environment.apiHost + 'posts/' + postId + '/attachments')
  }

  getPostComments(postId : number): Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(environment.apiHost + 'posts/' + postId + '/comments')
  }

}
