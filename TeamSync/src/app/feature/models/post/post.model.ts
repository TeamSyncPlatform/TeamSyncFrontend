import {UserReference} from "../../../shared/users/models/user-reference.model";
import {ChannelReference} from "../channel/channel-reference.model";
import {ReactionType} from "../reaction-type.enum";
import {CommentReference} from "../comment/comment-reference.model";
import {AttachmentReference} from "../attachment/attachment-reference.model";

export interface Post {
  id: number;
  content: string;
  creationDate: string;
  comments: CommentReference[];
  attachments: AttachmentReference[];
  reactions: { [key: number]: ReactionType };
  author: UserReference;
  channel: ChannelReference;
}
