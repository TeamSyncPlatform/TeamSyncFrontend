import {Component, Input} from '@angular/core';
import {Post} from "../../models/post/post.model";

@Component({
  selector: 'app-posts-cards',
  templateUrl: './posts-cards.component.html',
  styleUrl: './posts-cards.component.css'
})
export class PostsCardsComponent {
  @Input()
  posts!: Post[];
}
