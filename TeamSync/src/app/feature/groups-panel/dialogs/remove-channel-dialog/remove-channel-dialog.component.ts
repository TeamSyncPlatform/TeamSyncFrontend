import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/channel/channel.model";
import {ChannelService} from "../../../services/channel.service";


@Component({
  selector: 'app-remove-channel-dialog',
  templateUrl: './remove-channel-dialog.component.html',
  styleUrl: './remove-channel-dialog.component.css'
})
export class RemoveChannelDialogComponent {
  channel: Channel;

  constructor(
    private channelService: ChannelService,
    private dialogRef: MatDialogRef<RemoveChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.channel = data.channel;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.channelService.remove(this.channel.id).subscribe({
      next: (response) => {
        console.log("Channel removed successfully:", response);
        this.dialogRef.close(response);
      },
      error: (error) => {
        console.error("Error removing channel:", error);
      }
    });
  }
}
