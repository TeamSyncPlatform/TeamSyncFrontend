import {Component, inject, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-members-panel',
  templateUrl: './members-panel.component.html',
  styleUrl: './members-panel.component.css'
})
export class MembersPanelComponent implements OnInit{
  @Input()
  groupId!: number;
  role: string | null = '';
  members: User[] = [] as User[];
  readonly dialog = inject(MatDialog);

  constructor(
    private authenticationService: AuthenticationService,
    private groupService: GroupService) {
  }

  ngOnInit() {
    this.getRole();
    this.loadMembers();
  }

  getRole(){
    this.authenticationService.roleState.subscribe((result) => {
      this.role = result;
    });
  }

  loadMembers(){
    this.groupService.getMembers(this.groupId).subscribe({
      next: (members: User[]) => {
        this.members = members;
        console.log("Members: ", members);
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  openAddMemberDialog() {
    const dialogRef = this.dialog.open(AddMembersDialogComponent, {
      data: {
        groupId: this.groupId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        this.loadMembers();
      }
    });
  }
}
