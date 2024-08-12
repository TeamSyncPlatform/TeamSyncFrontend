import {Component, Inject} from '@angular/core';
import {Channel} from "../../models/channel/channel.model";
import {FormGroup} from "@angular/forms";
import {ChannelService} from "../../services/channel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-remove-group-dialog',
  templateUrl: './remove-group-dialog.component.html',
  styleUrl: './remove-group-dialog.component.css'
})
export class RemoveGroupDialogComponent {
  group: Group;

  constructor(
    private groupService: GroupService,
    private dialogRef: MatDialogRef<RemoveGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.group = data.group;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.groupService.remove(this.group.id).subscribe({
      next: (response) => {
        console.log("Group removed successfully:", response);
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error("Error removing group:", error);
      }
    });
  }
}
