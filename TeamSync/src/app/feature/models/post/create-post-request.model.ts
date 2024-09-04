import {ChannelReference} from "../channel/channel-reference.model";

export interface CreatePostRequest {
  content: string;
  channel: ChannelReference;
}
