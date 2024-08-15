import {ReactionType} from "./reaction-type.enum";

export interface Reaction {
  userId: number;
  type: ReactionType;
}

