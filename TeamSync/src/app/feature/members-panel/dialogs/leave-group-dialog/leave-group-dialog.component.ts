import {Component, Inject} from '@angular/core';
import {Channel} from "../../../models/channel/channel.model";
import {ChannelService} from "../../../services/channel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Group} from "../../../models/group/group.model";
import {GroupService} from "../../../services/group.service";
import {User} from "../../../../shared/users/models/user.model";

@Component({
  selector: 'app-leave-group-dialog',
  templateUrl: './leave-group-dialog.component.html',
  styleUrl: './leave-group-dialog.component.css'
})
export class LeaveGroupDialogComponent {
  group: Group;
  loggedUserId: string;

  constructor(
    private groupService: GroupService,
    private dialogRef: MatDialogRef<LeaveGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.group = data.group;
    this.loggedUserId = data.loggedUserId;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.groupService.removeMemberByExternalId(this.group.id, this.loggedUserId).subscribe({
      next: (response) => {
        console.log("Left group successfully:", true);
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error("Error leaving group:", error);
      }
    });
  }
}
