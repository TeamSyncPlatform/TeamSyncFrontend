import {inject, Injectable} from '@angular/core';
import {environment} from "../../core/env/env";
import {BehaviorSubject, forkJoin, tap} from "rxjs";
import {AuthenticationService} from "../../core/zitadel/authentication.service";
import {NotificationService} from "./notification.service";
import {User} from "../users/models/user.model";
import {UserService} from "../users/user.service";

import * as Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {Notification} from "./models/notification.model";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {NewPostNotification} from "./models/new-post-notification.model";
import {UnreadPostService} from "../../feature/services/unread-post.service";
import {ChannelReference} from "../../feature/models/channel/channel-reference.model";
import {NotificationType} from "./models/notification-type.model";

export interface PostInfo {
  count: number;
  userId: number;
}

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


  newPostsCount$ = new BehaviorSubject<Map<number, PostInfo>>(new Map());

  groupsStatus$ = new BehaviorSubject(0);

  loggedUser!: User | undefined;

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userService: UserService,
              private unreadPostService: UnreadPostService) {
    this.initialize();
  }

  private async initialize() {
    await this.getLoggedUser();
    this.initializeWebSocketConnection();
    this.updateUnreadCount();
    this.updateNewPostsCountForAllChannels();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket();
      that.openPostSocket();
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

        this.handleResult(notification);
      });
    }
  }

  openPostSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/post-publisher/" + this.loggedUser!.id, (frame: any) => {

        const newPostsNotificationString = frame.body;
        const newPostNotification: NewPostNotification = JSON.parse(newPostsNotificationString);

        // Handle the new post notification (e.g., show a snackbar or update the UI)
        this.handleNewPostNotification(newPostNotification);
      });
    }
  }

  handleResult(notification : Notification) {
    this.updateUnreadCount();
    this.handleGroupStatusNotification(notification);
    this.showMessage(notification.message);
  }

  async getLoggedUser(): Promise<void> {
    const userId = await this.authenticationService.getUserId().toPromise();
    if (userId) {
      this.loggedUser = await this.userService.getByExternalId(userId).toPromise();
    }
  }

  handleGroupStatusNotification(notification: Notification){
    if(notification.type == NotificationType.GroupsStatus){
      this.groupsStatus$.next(this.groupsStatus$.value+1);
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

  private handleNewPostNotification(newPostNotification: NewPostNotification) {
    const channelId = newPostNotification.channel.id;
    const currentCountMap = this.newPostsCount$.value;

    const postInfo = currentCountMap.get(channelId) || { count: 0, userId: newPostNotification.author.id };
    postInfo.count += 1;
    postInfo.userId = newPostNotification.author.id;

    currentCountMap.set(channelId, postInfo);
    this.newPostsCount$.next(new Map(currentCountMap));
  }

  public updateNewPostsCountForAllChannels(): void {
    if (this.loggedUser) {
      this.userService.getAllUserGroups(this.loggedUser.id).subscribe({
        next: (groups: any[]) => {
          const channels = groups.flatMap(group => group.channels);

          const updateCounts$ = channels.map((channel: ChannelReference) =>
            this.unreadPostService.getUnreadPostsCount(this.loggedUser!.id, channel.id).pipe(
              tap(count => {
                const currentCountMap = this.newPostsCount$.value;
                const postInfo = currentCountMap.get(channel.id) || { count: 0, userId: 0};
                postInfo.count = count;

                currentCountMap.set(channel.id, postInfo);
                this.newPostsCount$.next(new Map(currentCountMap));
                console.log(`Updated post count for channel ${channel.id}: ${count}`);
              })
            )
          );

          forkJoin(updateCounts$).subscribe({
            next: () => console.log("All new post counts updated"),
            error: (err) => console.error("Error updating new post counts:", err)
          });
        },
        error: (err) => console.error("Error fetching user groups:", err)
      });
    }
  }

  public updateLastReadTimestamp(channelId: number) {
    this.unreadPostService.updateLastReadTimestamp(this.loggedUser!.id, channelId).subscribe({
      next: () => {
        const currentCountMap = this.newPostsCount$.value;
        const postInfo = currentCountMap.get(channelId) || { count: 0, userId: this.loggedUser!.id };
        postInfo.count = 0;

        currentCountMap.set(channelId, postInfo);
        this.newPostsCount$.next(new Map(currentCountMap));
      }
    });
  }
}
