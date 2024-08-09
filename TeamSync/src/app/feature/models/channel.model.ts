import {Post} from "./post.model";
import {Group} from "./group.model";

export interface Channel {
  id: number;
  name: string;
  posts: Post[];
  group: Group;
}
