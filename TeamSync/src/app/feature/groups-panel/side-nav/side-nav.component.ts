import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectionStrategy,
  signal,
  inject,
  Input,
  OnDestroy
} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {Channel} from "../../models/channel/channel.model";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl} from "@angular/forms";
import {UserService} from "../../../shared/users/user.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../../shared/users/models/user.model";
import {MatDialog} from "@angular/material/dialog";
import {CreateGroupDialogComponent} from "../dialogs/create-group-dialog/create-group-dialog.component";
import {CreateChannelDialogComponent} from "../dialogs/create-channel-dialog/create-channel-dialog.component";
import {RemoveGroupDialogComponent} from "../dialogs/remove-group-dialog/remove-group-dialog.component";
import {RemoveChannelDialogComponent} from "../dialogs/remove-channel-dialog/remove-channel-dialog.component";
import {Observable, Subscription} from "rxjs";
import {PostInfo, WebsocketService} from "../../../shared/notifications/websocket.service";


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit, OnDestroy{
  groups: Group[] = [];
  dropdowns: Map<number, boolean> = new Map();
  channels:  Map<number, Channel[]> = new Map();
  selectedChannel: Channel = {"group":{}} as Channel;
  role: string | null = '';
  newPostsCount: Map<number, PostInfo> = new Map<number, PostInfo>();

  private eventsSubscription!: Subscription;
  private newPostsCountSubscription!: Subscription;
  @Input() events!: Observable<void>;

  @Output()
  channelClicked: EventEmitter<Channel> = new EventEmitter<Channel>();

  searchControl = new FormControl('');
  searchValue: string = '';
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private authenticationService:AuthenticationService,
    private groupService: GroupService,
    private websocketService: WebsocketService) {}

  ngOnInit() {
    this.searchGroups();
    this.getRole();
    this.subscribeToNewPostsCount();
    this.eventsSubscription = this.events.subscribe(() => this.searchGroups());
  }


  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
    if (this.newPostsCountSubscription) {
      this.newPostsCountSubscription.unsubscribe();
    }
  }

  getRole(){
    this.authenticationService.roleState.subscribe((result) => {
    this.role = result;
    });
  }

  toggleDropdown(groupId: number) {
    const isOpen = this.dropdowns.get(groupId) || false;
    if(!isOpen){
      this.loadChannels(groupId);
    }
    this.dropdowns.set(groupId, !isOpen);
  }

  selectChannel(channel: Channel) {
    this.channelClicked.emit(channel);
    this.selectedChannel = channel;
    this.websocketService.updateLastReadTimestamp(channel.id);
  }

  searchGroups(): void {
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.searchGroups(userId, this.searchValue).subscribe({
          next: (groups: Group[]) => {
            this.groups = groups;
            this.groups.forEach(group => {
              this.dropdowns.set(group.id, false);
              this.loadChannels(group.id);
            });
          },
          error: (_) => {
            console.log('Error!');
          },
        });
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

  onValueChange(newValue : string) {
    this.searchValue = newValue;
    this.searchGroups();
  }

  loadChannels(id: number){
    this.groupService.getGroupChannels(id).subscribe({
      next: (channels: Channel[]) => {
        this.channels.set(id, channels);
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }


  readonly dialog = inject(MatDialog);
  openCreateGroupDialog() {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchGroups();
      }
    });
  }

  openCreateChannelDialog(group: Group) {
    const dialogRef = this.dialog.open(CreateChannelDialogComponent, {
      data: {
        group: group
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChannels(group.id);
      }
    });
  }

  openRemoveGroupDialog(group: Group) {
    const dialogRef = this.dialog.open(RemoveGroupDialogComponent, {
      data: {
        group: group
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.searchGroups();
      }
    });
  }

  openRemoveChannelDialog(channel: Channel) {
    const dialogRef = this.dialog.open(RemoveChannelDialogComponent, {
      data: {
        channel: channel
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadChannels(channel.group.id);
      }
    });
  }

  private subscribeToNewPostsCount() {
    this.newPostsCountSubscription = this.websocketService.newPostsCount$.subscribe(newPostsCount => {
      this.newPostsCount = newPostsCount;
    });
  }

  getGroupUnreadPostsCount(groupId: number): number {
    let count = 0;
    let channels = this.channels.get(groupId);

    if (channels) {
      for (let channel of channels) {
        const postInfo = this.newPostsCount.get(channel.id);
        if (postInfo && channel.id !== this.selectedChannel.id) {
          count += postInfo.count;
        }
      }
    }

    return count;
  }

}
