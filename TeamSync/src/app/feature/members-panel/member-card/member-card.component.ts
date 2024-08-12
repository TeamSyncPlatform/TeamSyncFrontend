import {Component, Input} from '@angular/core';
import {User} from "../../../shared/users/models/user.model";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input()
  member!: User;

}
