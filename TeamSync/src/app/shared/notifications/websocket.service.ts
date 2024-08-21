import {inject, Injectable, OnInit} from '@angular/core';
import {environment} from "../../core/env/env";
import {BehaviorSubject} from "rxjs";
import {AuthenticationService} from "../../core/zitadel/authentication.service";
import {NotificationService} from "./notification.service";
import {User} from "../users/models/user.model";
import {UserService} from "../users/user.service";

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Notification} from "./models/notification.model";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService{

  private serverUrl = environment.socketHost + 'socket';
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  unreadCount$ = new BehaviorSubject(0);
  unreadCountState = this.unreadCount$.asObservable();

  loggedUser!: User | undefined;

  constructor(private authenticationService: AuthenticationService, private notificationService: NotificationService, private userService: UserService) {
    this.initialize();
  }

  private async initialize() {
    await this.getLoggedUser();
    this.initializeWebSocketConnection();
    this.updateUnreadCount();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      // that.openGlobalSocket();
      that.openSocket();
    }, function (error: Error) {
      console.error('Error during WebSocket connection:', error);
    });
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/notification-publisher", (notification: Notification) => {
        this.handleResult(notification);
      });
    }
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/notification-publisher/" + this.loggedUser!.id, (frame: any) => {

        const notificationString = frame.body;
        const notification: Notification = JSON.parse(notificationString);

        // Log the parsed notification
        console.log("New notification: ", notification);

        this.handleResult(notification);
      });
    }
  }

  handleResult(notification : Notification) {
    this.updateUnreadCount();
    this.showMessage(notification.message);
  }

  async getLoggedUser(): Promise<void> {
    const userId = await this.authenticationService.getUserId().toPromise();
    if (userId) {
      this.loggedUser = await this.userService.getByExternalId(userId).toPromise();
    }
  }

  public updateUnreadCount(){
    this.notificationService.getUnreadCountByUser(this.loggedUser!.id).subscribe({
      next: (data: number) => {
        this.unreadCount$.next(data);
        console.log("Unread count: ", data);
      }
    })
  }

  //SNACK BAR
  private _snackBar = inject(MatSnackBar);
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  showMessage(message : string) {
    this._snackBar.open(message, 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
