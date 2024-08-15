import {PostReference} from "../post/post-reference.model";

export interface Attachment {
  id: number;
  path: string;
  post: PostReference;
  originalName: string;
}
