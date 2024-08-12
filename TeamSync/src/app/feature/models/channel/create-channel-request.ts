import {GroupReference} from "../group/group-reference.model";

export interface CreateChannelRequest {
  name: string;
  group: GroupReference;
}
