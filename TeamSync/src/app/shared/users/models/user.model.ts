import {Role} from "./role.model";
import {NotificationType} from "../../notifications/models/notification-type.model";
import {Image} from "./image.model";

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
  profileImage: Image;
  ignoredNotifications: NotificationType[];
}
