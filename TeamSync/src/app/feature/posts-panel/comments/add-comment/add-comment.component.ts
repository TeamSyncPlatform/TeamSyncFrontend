import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post/post.model";
import {User} from "../../../../shared/users/models/user.model";
import {CommentService} from "../../../services/comment.service";
import {CreateCommentRequest} from "../../../models/comment/create-comment-request.model";
import {Comment} from "../../../models/comment/comment.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../../../../shared/users/user.service";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit{
  @Input() post!: Post;
  @Input() loggedUser!: User;
  content: string = '';
  @Output() commentAdded = new EventEmitter<Comment>();
  profileImageUrl: SafeUrl | string = '/default-profile-image.png';

  constructor(private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loadProfileImage();
  }

  onSendClick() {
    const createCommentRequest : CreateCommentRequest = {
      author: this.loggedUser,
      content: this.content,
      post: this.post

    };
    this.commentService.create(createCommentRequest).subscribe({
      next: (response: Comment) => {
        this.commentAdded.emit(response);
        this.content = '';
        console.log("Channel created successfully:", response);
      },
      error: (error) => {
        console.error("Error creating channel:", error);
      }
    });
  }

  loadProfileImage() {
    if (this.loggedUser.profileImage.id) {
      this.userService.getProfileImage(this.loggedUser.profileImage.id).subscribe({
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
}
