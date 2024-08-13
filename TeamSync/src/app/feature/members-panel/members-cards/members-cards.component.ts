import {Component, Input} from '@angular/core';
import {User} from "../../../shared/users/models/user.model";
import {Group} from "../../models/group/group.model";

@Component({
  selector: 'app-members-cards',
  templateUrl: './members-cards.component.html',
  styleUrl: './members-cards.component.css'
})
export class MembersCardsComponent {
  @Input()
  members: User[] = [] as User[];

  @Input()
  group: Group = {} as Group;

}
