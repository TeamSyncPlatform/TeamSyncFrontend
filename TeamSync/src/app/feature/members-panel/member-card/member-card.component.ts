import {Component, Input} from '@angular/core';
import {User} from "../../../shared/users/models/user.model";
import {Group} from "../../models/group/group.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  @Input()
  member!: User;

  @Input()
  group!: Group;

  constructor(private router: Router) {

  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.member.email]);
  }
}
