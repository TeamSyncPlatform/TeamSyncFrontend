import {Component, Input, OnInit} from '@angular/core';
import {Comment} from "../../../models/comment/comment.model";
import {User} from "../../../../shared/users/models/user.model";
import {ReactionType} from "../../../models/reaction/reaction-type.enum";
import {CommentService} from "../../../services/comment.service";
import {Reaction} from "../../../models/reaction/reaction.model";

@Component({
  selector: 'app-comment-reactions',
  templateUrl: './comment-reactions.component.html',
  styleUrl: './comment-reactions.component.css'
})
export class CommentReactionsComponent implements OnInit{
  @Input() comment!: Comment;
  @Input() loggedUser!: User;
  reactionsData: { name: ReactionType, icon: string, count: number }[] = [];
  currentUserReaction: ReactionType | null = null;

  constructor(private commentService: CommentService) {  }

  ngOnInit() {
    this.initializeReactionsData();
  }

  initializeReactionsData() {
    const reactionTypes = Object.values(ReactionType);
    this.reactionsData = reactionTypes.map(type => {
      const count = Object.values(this.comment.reactions).filter(reaction => reaction === type).length;
      if (this.comment.reactions[this.loggedUser.id] === type) {
        this.currentUserReaction = type;
      }
      return { name: type, icon: this.getReactionIcon(type), count };
    });
  }

  getReactionIcon(reactionType: ReactionType): string {
    const icons = {
      [ReactionType.Like]: 'thumb_up',
      [ReactionType.Dislike]: 'thumb_down',
      [ReactionType.Love]: 'favorite',
      [ReactionType.Laugh]: 'sentiment_very_satisfied',
      [ReactionType.Wow]: 'emoji_objects',
      [ReactionType.Angry]: 'sentiment_very_dissatisfied',
      [ReactionType.Sad]: 'sentiment_dissatisfied',
    };

    return icons[reactionType];
  }

  react(reactionType: ReactionType) {
    const reaction: Reaction = {
      userId: this.loggedUser.id,
      type: reactionType
    };

    if (this.currentUserReaction === reactionType) {
      this.removeReaction(reactionType);
    } else {
      this.addReaction(reactionType);
    }
  }

  addReaction(reactionType: ReactionType) {
    const reaction: Reaction = {
      userId: this.loggedUser.id,
      type: reactionType
    };

    this.commentService.addReaction(this.comment.id, reaction).subscribe(updatedComment => {
      this.comment = updatedComment;
      this.currentUserReaction = reactionType;
      this.initializeReactionsData();
    });
  }

  removeReaction(reactionType: ReactionType) {
    const reaction: Reaction = {
      userId: this.loggedUser.id,
      type: reactionType
    };

    this.commentService.removeReaction(this.comment.id, reaction).subscribe(updatedComment => {
      this.comment = updatedComment;
      this.currentUserReaction = null;
      this.initializeReactionsData();
    });
  }

  getFilteredReactionsData() {
    return this.reactionsData.filter(reaction => reaction.count > 0);
  }
}
