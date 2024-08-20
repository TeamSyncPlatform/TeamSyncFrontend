import {UserReference} from "../../users/models/user-reference.model";
import {NotificationType} from "./notification-type.model";

export interface Notification{
  id: number;
  message: string;
  isRead: boolean;
  timeCreated: string;
  notificationType: NotificationType;
  user: UserReference;
}
