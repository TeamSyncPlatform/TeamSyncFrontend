import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Post} from "../../../models/post/post.model";
import {User} from "../../../../shared/users/models/user.model";
import {PostService} from "../../../services/post.service";
import {Comment} from "../../../models/comment/comment.model";
import { Group } from '../../../models/group/group.model';

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrl: './comments-section.component.css'
})
export class CommentsSectionComponent {
  @Input() post!: Post;
  @Input() loggedUser!: User;
  comments: Comment[] = [] as Comment[];

  @Output() commentAdded = new EventEmitter<Comment>();
  @Input() group!: Group;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.loadComments()
  }

  loadComments(){
    this.postService.getPostComments(this.post.id).subscribe({
      next: (comments: Comment[]) => {
        this.comments = comments;
      },
      error: (error) => {
        console.error("Error loading comments:", error);
      }
    });
  }

  onCommentAdded(comment: Comment) {
    this.loadComments();
    this.commentAdded.emit(comment);
  }
}
