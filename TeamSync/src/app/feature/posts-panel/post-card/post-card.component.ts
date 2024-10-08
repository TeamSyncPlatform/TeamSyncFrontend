import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post/post.model";
import {User} from "../../../shared/users/models/user.model";
import {UserService} from "../../../shared/users/user.service";
import {AttachmentService} from "../../services/attachment.service";
import {Attachment} from "../../models/attachment/attachment-dto.model";
import {PostService} from "../../services/post.service";
import {Channel} from "../../models/channel/channel.model";
import {Reaction} from "../../models/reaction/reaction.model";
import {ReactionType} from "../../models/reaction/reaction-type.enum";
import {CreatePostDialogComponent} from "../dialogs/create-post-dialog/create-post-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPostDialogComponent} from "../dialogs/edit-post-dialog/edit-post-dialog.component";
import {RemovePostDialogComponent} from "../dialogs/remove-post-dialog/remove-post-dialog.component";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {Comment} from "../../models/comment/comment.model";
import {Group} from "../../models/group/group.model";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit{
  @Input()
  post!: Post;
  @Input() group!: Group;
  author: User = {} as User;
  content!: string;
  attachments!: Attachment[];
  @Input() loggedUser!: User;
  profileImageUrl: SafeUrl | string = '/default-profile-image.png';

  readonly dialog = inject(MatDialog);

  areCommentsShowing: boolean = false;
  @Output() postDeleted = new EventEmitter<Post>();

  constructor(
    private userService: UserService,
    private attachmentService: AttachmentService,
    private postService: PostService,
    private sanitizer: DomSanitizer,
    private router: Router) {
  }

  ngOnInit() {
    this.loadAuthor();
    this.loadAttachments();
    this.content = this.post.content;
  }

  toggleComments(){
    this.areCommentsShowing = !this.areCommentsShowing;
    this.reloadPost();
  }

  private loadAuthor() {
    this.userService.get(this.post.author.id).subscribe({
      next: (user: User) => {
        this.author = user
        this.loadProfileImage();
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    })
  }

  loadProfileImage() {
    if (this.author.profileImage) {
      this.userService.getProfileImage(this.author.profileImage.id).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          console.error('Error loading profile image:', err);
          this.profileImageUrl = '/default-profile-image.png';
        }
      });
    } else {
      this.profileImageUrl = '/default-profile-image.png';
    }
  }

  private reloadPost() {
    this.postService.get(this.post.id).subscribe({
      next: (post: Post) => {
        this.post = post
        this.content = this.post.content
        this.loadAttachments();
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    })
  }

  private loadAttachments() {
    this.postService.getPostAttachments(this.post.id).subscribe({
      next: (attachments: Attachment[]) => {
        this.attachments = attachments;
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    })
  }

  getCommentsSize() {
    return this.post.comments.length;
  }

  getPostCreation(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);  // Approximation
    const years = Math.floor(days / 365);  // Approximation

    if (seconds < 60) {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (days < 7) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (weeks < 4) {
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (months < 12) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }

  downloadAttachment(attachment: Attachment): void {
    this.attachmentService.downloadAttachment(attachment.path).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;

      a.download = attachment.originalName || 'download';

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  editPostClicked() {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: {
        post: this.post,
        attachments: this.attachments
      },
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        console.log('The dialog was closed with result:', response);
        this.reloadPost();
      }
    });
  }

    removePostClicked() {
      const dialogRef = this.dialog.open(RemovePostDialogComponent, {
        data: {
          post: this.post
        }
      });

      dialogRef.afterClosed().subscribe(response => {
        if (response) {
          console.log('The dialog was closed with result:', response);
          this.postDeleted.emit(response);
        }
      });
    }

  goToProfilePage() {
    this.router.navigate(['/profile', this.author.email]);
  }

  onCommentAdded(comment: Comment) {
    this.post.comments.push(comment);
  }
}
