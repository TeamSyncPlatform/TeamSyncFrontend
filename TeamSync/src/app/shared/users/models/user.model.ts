import {Role} from "./role.model";
import {NotificationType} from "./notification-type.model";

export interface User {
  id: number;
  externalIdentification: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  role: string;
  department: string;
  jobTitle: string;
  skills: string[];
  ignoredNotifications: NotificationType[];
}
