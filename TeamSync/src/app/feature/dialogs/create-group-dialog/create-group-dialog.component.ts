import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../services/group.service";
import {CreateGroupRequest} from "../../models/group/create-group-request.model";
import {Group} from "../../models/group/group.model";

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrl: './create-group-dialog.component.css'
})
export class CreateGroupDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateGroupDialogComponent>);
  groupName: string = '';

  constructor(private groupService: GroupService) {
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick() {
    if (this.groupName) {
      const createGroupRequest : CreateGroupRequest = {
        "name" : this.groupName
      };

      this.groupService.create(createGroupRequest).subscribe({
        next: (response: Group) => {
          console.log("Group created successfully:", response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error("Error creating group:", error);
        }
      });
    }
  }
}
