import {Component, Inject} from '@angular/core';
import {Group} from "../../../models/group/group.model";
import {GroupService} from "../../../services/group.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Channel} from "../../../models/channel/channel.model";
import {PostService} from "../../../services/post.service";
import {CreatePostRequest} from "../../../models/post/create-post-request.model";
import {AttachmentService} from "../../../services/attachment.service";
import {Post} from "../../../models/post/post.model";
import {Attachment} from "../../../models/attachment/attachment-dto.model";

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.css'
})
export class CreatePostDialogComponent {
  channel: Channel;
  loggedUserId: string;
  content!: string;
  attachments: File[] = [];

  constructor(
    private postService: PostService,
    private attachmentService: AttachmentService,
    private dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.channel = data.channel;
    this.loggedUserId = data.loggedUserId;
  }

  removeFile(index: number) {
    this.attachments.splice(index, 1);
  }

  uploadAttachments(postId: number) {
    if (this.attachments.length === 0) {
      console.error('No files selected');
      return;
    }

    this.attachments.forEach(file => {
      this.attachmentService.uploadAttachment(file, postId).subscribe(
        {
          next: (attachment: Attachment) => {
            console.log("Created attachment successfully:", attachment);
          },
          error: (error) => {
            console.error("Error creating attachment:", error);
          }
        });
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const newFiles: File[] = Array.from(event.target.files);
      this.attachments = [...this.attachments, ...newFiles];
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onCreateClick(): void {

    const createRequest: CreatePostRequest = {
      content: this.content,
      channel: this.channel
    };

    this.postService.create(createRequest).subscribe({
      next: (createdPost: Post) => {
        this.uploadAttachments(createdPost.id)
        console.log("Created post successfully:", createdPost);
        this.dialogRef.close(createdPost);
      },
      error: (error) => {
        console.error("Error creating post:", error);
      }
    });
  }

}
