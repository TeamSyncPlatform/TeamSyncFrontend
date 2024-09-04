import {UserReference} from "../../users/models/user-reference.model";
import {NotificationType} from "./notification-type.model";

export interface Notification{
  id: number;
  message: string;
  isRead: boolean;
  creationDate: string;
  type: NotificationType;
  user: UserReference;
}
