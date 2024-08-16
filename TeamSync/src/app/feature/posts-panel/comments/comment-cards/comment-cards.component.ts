import {Component, Input, OnInit} from '@angular/core';
import { Post } from '../../../models/post/post.model';
import {User} from "../../../../shared/users/models/user.model";
import {PostService} from "../../../services/post.service";
import {Comment} from "../../../models/comment/comment.model";

@Component({
  selector: 'app-comment-cards',
  templateUrl: './comment-cards.component.html',
  styleUrl: './comment-cards.component.css'
})
export class CommentCardsComponent{
  @Input() post!: Post;
  @Input() loggedUser!: User;
  @Input() comments!: Comment[];

}
