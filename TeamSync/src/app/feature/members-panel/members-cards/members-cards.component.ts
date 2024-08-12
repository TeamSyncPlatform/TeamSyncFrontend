import {Component, Input} from '@angular/core';
import {User} from "../../../shared/users/models/user.model";

@Component({
  selector: 'app-members-cards',
  templateUrl: './members-cards.component.html',
  styleUrl: './members-cards.component.css'
})
export class MembersCardsComponent {
  @Input()
  members: User[] = [] as User[];

}
