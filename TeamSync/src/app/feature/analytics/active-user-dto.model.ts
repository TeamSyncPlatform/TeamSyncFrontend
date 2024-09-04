import {User} from "../../shared/users/models/user.model";

export interface ActiveUserDTO {
  user: User;
  activityCount: number;
}
