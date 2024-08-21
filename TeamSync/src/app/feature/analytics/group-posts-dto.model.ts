import {User} from "../../shared/users/models/user.model";
import {Group} from "../models/group/group.model";

export interface GroupPostsDTO {
  group: Group;
  postsCount: number;
}
