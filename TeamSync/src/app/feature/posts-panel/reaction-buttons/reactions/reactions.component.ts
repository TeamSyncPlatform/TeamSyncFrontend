import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReactionType} from "../../../models/reaction/reaction-type.enum";
import {Post} from "../../../models/post/post.model";
import {AuthenticationService} from "../../../../core/zitadel/authentication.service";
import {User} from "../../../../shared/users/models/user.model";
import {PostService} from "../../../services/post.service";
import {Reaction} from "../../../models/reaction/reaction.model";

@Component({
  selector: 'app-reactions',
  templateUrl: './reactions.component.html',
  styleUrl: './reactions.component.css'
})
export class ReactionsComponent implements OnInit{
  @Input() post!: Post;
  @Input() loggedUser!: User;
  reactionsData: { name: ReactionType, icon: string, count: number }[] = [];
  currentUserReaction: ReactionType | null = null;

  constructor(private postService: PostService) {  }

  ngOnInit() {
    this.initializeReactionsData();
  }

  initializeReactionsData() {
    const reactionTypes = Object.values(ReactionType);
    this.reactionsData = reactionTypes.map(type => {
      const count = Object.values(this.post.reactions).filter(reaction => reaction === type).length;
      if (this.post.reactions[this.loggedUser.id] === type) {
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

    this.postService.addReaction(this.post.id, reaction).subscribe(updatedPost => {
      this.post = updatedPost;
      this.currentUserReaction = reactionType;
      this.initializeReactionsData();
    });
  }

  removeReaction(reactionType: ReactionType) {
    const reaction: Reaction = {
      userId: this.loggedUser.id,
      type: reactionType
    };

    this.postService.removeReaction(this.post.id, reaction).subscribe(updatedPost => {
      this.post = updatedPost;
      this.currentUserReaction = null;
      this.initializeReactionsData();
    });
  }

  getFilteredReactionsData() {
    return this.reactionsData.filter(reaction => reaction.count > 0);
  }
}
