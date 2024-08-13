import {Channel} from "../channel/channel.model";
import {User} from "../../../shared/users/models/user.model";
import {UserReference} from "../../../shared/users/models/user-reference.model";

export interface Group {
  id: number;
  name: string;
  owner: UserReference;
  channels: Channel[];
  members: UserReference[];
}
