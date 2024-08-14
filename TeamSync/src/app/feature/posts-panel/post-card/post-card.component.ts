import { Component } from '@angular/core';
import {ReactionType} from "../models/reaction-type.enum";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  reactions: { name: ReactionType, icon: string }[] = [
    { name: ReactionType.Like, icon: 'thumb_up' },
    { name: ReactionType.Dislike, icon: 'thumb_down' },
    { name: ReactionType.Love, icon: 'favorite' },
    { name: ReactionType.Laugh, icon: 'sentiment_very_satisfied' },
    { name: ReactionType.Wow, icon: 'emoji_objects' },
    { name: ReactionType.Angry, icon: 'sentiment_very_dissatisfied' },
    { name: ReactionType.Sad, icon: 'sentiment_dissatisfied' }
  ];

  react(reactionType : ReactionType) {
    console.log(`Reacted with: ${reactionType}`);
  }
}
