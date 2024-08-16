import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../../../models/post/post.model";
import {User} from "../../../../shared/users/models/user.model";
import {CommentService} from "../../../services/comment.service";
import {CreateCommentRequest} from "../../../models/comment/create-comment-request.model";
import {Comment} from "../../../models/comment/comment.model";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {
  @Input() post!: Post;
  @Input() loggedUser!: User;
  content: string = '';
  @Output() commentAdded = new EventEmitter<Comment>();

  constructor(private commentService: CommentService,) {
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
}
