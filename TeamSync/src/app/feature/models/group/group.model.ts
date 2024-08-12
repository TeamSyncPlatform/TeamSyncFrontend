import {Channel} from "../channel/channel.model";
import {User} from "../../../shared/users/models/user.model";

export interface Group {
  id: number;
  name: string;
  channels: Channel[];
  members: User[];
}
