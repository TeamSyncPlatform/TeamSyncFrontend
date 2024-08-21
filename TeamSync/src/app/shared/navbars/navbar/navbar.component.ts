import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../users/models/user.model";
import {UserService} from "../../users/user.service";
import {WebsocketService} from "../../notifications/websocket.service";
import {Notification} from "../../notifications/models/notification.model";
import {NotificationService} from "../../notifications/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  role: string | null = 'user';
  loggedUser!: User | undefined;
  notificationsBadge: string = "";
  notifications!: Notification[];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private websocketService: WebsocketService,
    private notificationService: NotificationService) {
  }

  async ngOnInit() {
    await this.getLoggedUser();
    this.getRole();
    this.subscribeNotifications();
  }

  subscribeNotifications(){
    this.websocketService.unreadCountState.subscribe({
      next: (data: number) => {
        this.notificationsBadge = data.toString()
        this.loadNotifications();
      }
    });
  }

  getRole(){
    this.authenticationService.getUserRole().subscribe({
      next: (role: string | null) => {
        this.role = role;
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

  async getLoggedUser(): Promise<void> {
    const userId = await this.authenticationService.getUserId().toPromise();
    if (userId) {
      this.loggedUser = await this.userService.getByExternalId(userId).toPromise();
    }
  }

  loadNotifications(){
    this.notificationService.getAllByUser(this.loggedUser!.id).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
      }
    })
  }

  readAllNotifications(){
    this.notificationService.readAllByUser(this.loggedUser!.id).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        this.notificationsBadge = '';
      }
    })
  }

  onNotificationsClicked($event: void) {
    this.loadNotifications();
  }

  onReadAllClicked($event: void) {
    this.readAllNotifications();
  }

  onReadClicked($event: any) {
    const currentBadgeCount = parseInt(this.notificationsBadge, 10) || 0;
    const newBadgeCount = Math.max(currentBadgeCount - 1, 0);
    this.notificationsBadge = newBadgeCount > 0 ? newBadgeCount.toString() : '';
  }
}
