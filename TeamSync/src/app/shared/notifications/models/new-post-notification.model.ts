import {NotificationType} from "./notification-type.model";
import {UserReference} from "../../users/models/user-reference.model";
import {ChannelReference} from "../../../feature/models/channel/channel-reference.model";
import {GroupReference} from "../../../feature/models/group/group-reference.model";
import {User} from "../../users/models/user.model";
import {Group} from "../../../feature/models/group/group.model";
import {Channel} from "../../../feature/models/channel/channel.model";

export interface NewPostNotification{
  channel: Channel;
  group: Group;
  author: User;
  user: User;
}
