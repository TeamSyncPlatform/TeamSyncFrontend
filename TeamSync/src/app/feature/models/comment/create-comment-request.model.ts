import {UserReference} from "../../../shared/users/models/user-reference.model";
import {PostReference} from "../post/post-reference.model";

export interface CreateCommentRequest {
  content: string,
  author: UserReference,
  post: PostReference
}
