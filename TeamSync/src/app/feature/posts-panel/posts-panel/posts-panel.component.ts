import {Component, inject, Input} from '@angular/core';
import { Group } from '../../models/group/group.model';
import { Channel } from '../../models/channel/channel.model';
import {LeaveGroupDialogComponent} from "../../members-panel/dialogs/leave-group-dialog/leave-group-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../dialogs/create-post-dialog/create-post-dialog.component";

@Component({
  selector: 'app-posts-panel',
  templateUrl: './posts-panel.component.html',
  styleUrl: './posts-panel.component.css'
})
export class PostsPanelComponent {
  @Input() group!: Group | undefined;
  @Input() channel!: Channel | undefined;
  @Input() loggedUserId!: string;

  readonly dialog = inject(MatDialog);

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {
        channel: this.channel,
        loggedUserId: this.loggedUserId
      },
      width: '90vw',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed with result:', result);
        // this.groupLeft.emit();
      }
    });
  }
}
