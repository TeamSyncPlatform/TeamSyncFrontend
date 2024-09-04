import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../../shared/users/models/user.model";
import {Channel} from "../../models/channel/channel.model";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";
import {
  RemoveChannelDialogComponent
} from "../../groups-panel/dialogs/remove-channel-dialog/remove-channel-dialog.component";
import {AddMembersDialogComponent} from "../dialogs/add-members-dialog/add-members-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RemoveMembersDialogComponent} from "../dialogs/remove-members-dialog/remove-members-dialog.component";
import {UserService} from "../../../shared/users/user.service";
import {RemoveGroupDialogComponent} from "../../groups-panel/dialogs/remove-group-dialog/remove-group-dialog.component";
import {LeaveGroupDialogComponent} from "../dialogs/leave-group-dialog/leave-group-dialog.component";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-members-panel',
  templateUrl: './members-panel.component.html',
  styleUrl: './members-panel.component.css'
})
export class MembersPanelComponent implements OnInit, OnDestroy{
  @Input()
  group!: Group;
  owner!: User;
  loggedUserIdentification!: string;
  role: string | null = '';
  members: User[] = [] as User[];
  readonly dialog = inject(MatDialog);

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private groupService: GroupService) {
  }

  @Output()
  groupLeft: EventEmitter<void> = new EventEmitter<void>();

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<Group>;

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.getRole();
    this.loadMembers();
    this.getOwner();
    this.getLoggedUserIdentification();

    this.eventsSubscription = this.events.subscribe((group: Group) => {
      this.group = group;
      this.getOwner();
      this.loadMembers();
    });
  }

  getRole(){
    this.authenticationService.roleState.subscribe((result) => {
      this.role = result;
    });
  }

  getOwner(){
    this.userService.get(this.group.owner.id).subscribe({
      next: (owner: User) => {
        this.owner = owner;
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  getLoggedUserIdentification(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.loggedUserIdentification = userId;
      }
    });
  }

  loadMembers(){
    this.groupService.getMembers(this.group.id).subscribe({
      next: (members: User[]) => {
        this.members = members;
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  openAddMembersDialog() {
    const dialogRef = this.dialog.open(AddMembersDialogComponent, {
      data: {
        groupId: this.group.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMembers();
      }
    });
  }

  openRemoveMembersDialog() {
    const dialogRef = this.dialog.open(RemoveMembersDialogComponent, {
      data: {
        group: this.group
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMembers();
      }
    });
  }

  openLeaveGroupDialog() {
    const dialogRef = this.dialog.open(LeaveGroupDialogComponent, {
      data: {
        group: this.group,
        loggedUserId: this.loggedUserIdentification
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupLeft.emit();
      }
    });
  }
}
