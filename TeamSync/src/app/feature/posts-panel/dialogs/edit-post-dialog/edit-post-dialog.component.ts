import {Component, Inject, OnInit} from '@angular/core';
import {Channel} from "../../../models/channel/channel.model";
import {PostService} from "../../../services/post.service";
import {AttachmentService} from "../../../services/attachment.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Attachment} from "../../../models/attachment/attachment-dto.model";
import {CreatePostRequest} from "../../../models/post/create-post-request.model";
import {Post} from "../../../models/post/post.model";

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrl: './edit-post-dialog.component.css'
})
export class EditPostDialogComponent implements OnInit{
  post: Post;
  content!: string;
  attachments!: Attachment[];
  attachmentFiles: File[] = [];

  constructor(
    private postService: PostService,
    private attachmentService: AttachmentService,
    private dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.post = data.post;
    this.attachments = data.attachments;
    this.content = this.post.content;
  }

  ngOnInit() {
    this.loadAttachmentFiles(this.attachments)
  }

  loadAttachmentFiles(attachments: Attachment[]): void {
    attachments.forEach(attachment => {
      this.addAttachmentToList(attachment);
    });
  }
  addAttachmentToList(attachment: Attachment): void {
    this.attachmentService.downloadAttachment(attachment.path).subscribe(blob => {
      const file = new File([blob], attachment.originalName, { type: blob.type });
      this.attachmentFiles.push(file);
    });
  }

  removeFile(index: number) {
    this.attachmentFiles.splice(index, 1);
  }

  uploadAttachments(postId: number) {
    if (this.attachmentFiles.length === 0) {
      console.error('No files selected');
      return;
    }

    this.attachmentFiles.forEach(file => {
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
      this.attachmentFiles = [...this.attachmentFiles, ...newFiles];
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onEditClick(): void {
    this.post.content = this.content;
    this.postService.update(this.post).subscribe({
      next: (updatedPost: Post) => {
        this.uploadAttachments(updatedPost.id)
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error("Error creating post:", error);
      }
    });
  }
}
