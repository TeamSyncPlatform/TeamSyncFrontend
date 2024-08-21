import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../users/models/user.model';
import {NotificationType} from "../models/notification-type.model";
import {UserService} from "../../users/user.service";

@Component({
  selector: 'app-ignore-notifications',
  templateUrl: './ignore-notifications.component.html',
  styleUrls: ['./ignore-notifications.component.css']
})
export class IgnoreNotificationsComponent implements OnInit {
  @Input() loggedUser!: User;

  notificationTypes = Object.values(NotificationType) as NotificationType[];

  sliderStates: { [key: string]: boolean } = {};

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.notificationTypes.forEach(type => {
      this.sliderStates[type] = !this.loggedUser.ignoredNotifications.includes(type);
    });

    console.log(this.loggedUser);
  }

  onSliderChange(type: NotificationType): void {
    this.toggleNotification(this.loggedUser.id, type);
  }

  toggleNotification(userId: number, notificationType: string): void {
    this.userService.toggleNotification(userId, notificationType).subscribe({
      next: (updatedUser: User) => {

      }
    });
  }
}
