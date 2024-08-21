import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {UserService} from "../../../shared/users/user.service";
import {User} from "../../../shared/users/models/user.model";
import {Channel} from "../../models/channel/channel.model";
import {group} from "@angular/animations";
import {channel} from "node:diagnostics_channel";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";
import {Subject, Subscription} from "rxjs";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {WebsocketService} from "../../../shared/notifications/websocket.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  activeChannel! : Channel | undefined;
  activeGroup: Group | undefined;
  loggedUser!: User;
  private subscription: Subscription | null = null;

  public leaveEventsSubject: Subject<void> = new Subject<void>();
  public channelChangedEventsSubject: Subject<Channel> = new Subject<Channel>();

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getLoggedUser();
  }



  onChannelClicked(channel: Channel) {
    this.activeChannel = channel
    this.loadGroup(this.activeChannel.group.id);
    this.channelChangedEventsSubject.next(this.activeChannel);
  }

  onGroupLeave(){
    this.activeChannel = undefined;
    this.activeGroup = undefined;
    this.leaveEventsSubject.next();
    //signal here
  }

  loadGroup(id: number){
    this.groupService.get(id).subscribe({
      next: (group: Group) => {
        this.activeGroup = group
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    });
  }

  getLoggedUser(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.getByExternalId(userId).subscribe({
          next: (user: User) => {
            this.loggedUser = user;
          }
        });
      }
    });
  }


}
