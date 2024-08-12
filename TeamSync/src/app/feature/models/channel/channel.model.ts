import {Post} from "../post.model";
import {Group} from "../group/group.model";
import {GroupReference} from "../group/group-reference.model";

export interface Channel {
  id: number;
  name: string;
  posts: Post[];
  group: GroupReference;
}
