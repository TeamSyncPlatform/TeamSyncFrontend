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
  role: Role;
  department: string;
  jobTitle: string;
  skills: string[];
  ignoredNotifications: NotificationType[]; // You should define this model based on your requirements
}
