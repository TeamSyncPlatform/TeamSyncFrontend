import {Post} from "./post.model";
import {Group} from "./group.model";
import {GroupReference} from "./group-reference.model";

export interface Channel {
  id: number;
  name: string;
  posts: Post[];
  group: GroupReference;
}
