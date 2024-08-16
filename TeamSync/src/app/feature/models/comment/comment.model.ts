import {UserReference} from "../../../shared/users/models/user-reference.model";
import {PostReference} from "../post/post-reference.model";
import {ReactionType} from "../reaction/reaction-type.enum";

export interface Comment {
  id: number;
  content: string;
  author: UserReference;
  creationDate: string;
  reactions: { [key: number]: ReactionType };
  post: PostReference;
}
