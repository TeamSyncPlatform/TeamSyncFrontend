import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../../services/post.service";
import {Post} from "../../../models/post/post.model";

@Component({
  selector: 'app-remove-post-dialog',
  templateUrl: './remove-post-dialog.component.html',
  styleUrl: './remove-post-dialog.component.css'
})
export class RemovePostDialogComponent {
  post: Post;

  constructor(
    private postService: PostService,
    private dialogRef: MatDialogRef<RemovePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.post = data.post;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.postService.remove(this.post.id).subscribe({
      next: (post: Post) => {
        console.log("Post removed successfully:", post);
        this.dialogRef.close(post);
      },
      error: (error) => {
        console.error("Error removing post:", error);
      }
    });
  }
}
