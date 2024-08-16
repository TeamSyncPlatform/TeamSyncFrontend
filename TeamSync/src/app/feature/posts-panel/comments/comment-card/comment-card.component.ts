import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post/post.model";
import {User} from "../../../../shared/users/models/user.model";
import {Comment} from "../../../models/comment/comment.model";
import {UserService} from "../../../../shared/users/user.service";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent implements OnInit{
  @Input() comment!: Comment;
  @Input() post!: Post;
  @Input() loggedUser!: User;
  author: User = {} as User;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadAuthor();
  }

  private loadAuthor() {
    this.userService.get(this.comment.author.id).subscribe({
      next: (user: User) => {
        this.author = user
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    })
  }

  getCommentCreation(dateString: string): string {
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
}
