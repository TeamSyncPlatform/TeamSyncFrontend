import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ChannelService} from "../../services/channel.service";
import {Group} from "../../models/group/group.model";

@Component({
  selector: 'app-create-channel-dialog',
  templateUrl: './create-channel-dialog.component.html',
  styleUrl: './create-channel-dialog.component.css'
})
export class CreateChannelDialogComponent {
  group: Group;

  channelForm!: FormGroup;
  nameError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private dialogRef: MatDialogRef<CreateChannelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.group = data.group;
  }

  ngOnInit(): void {
    this.channelForm = this.fb.group({
      channelName: ['', [Validators.required]]
    });

    this.channelForm.get('channelName')?.valueChanges.subscribe(value => {
      this.onChannelNameChange(value);
    });
  }

  onChannelNameChange(channelName: string): void {
    if (channelName) {
      this.channelService.isNameUnique(channelName).subscribe({
        next: (isUnique: Boolean) => {
          if (!isUnique) {
            this.nameError = 'Channel name is already taken.';
            this.channelForm.get('channelName')?.setErrors({ nameTaken: true });
          } else {
            this.nameError = null;
            this.channelForm.get('channelName')?.setErrors(null);
          }
        },
        error: (error) => {
          console.error("Error checking group name:", error);
        }
      });
    } else {
      this.nameError = null;
      this.channelForm.get('channelName')?.setErrors(null);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.channelForm.valid) {
      const createChannelRequest = {
        name: this.channelForm.value.channelName ,
        group: {
          id: this.group.id
        }
      };
      this.channelService.create(createChannelRequest).subscribe({
        next: (response) => {
          console.log("Channel created successfully:", response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error("Error creating group:", error);
        }
      });
    }
  }
}
