import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../../shared/users/models/user.model";
import {Channel} from "../../models/channel/channel.model";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-members-panel',
  templateUrl: './members-panel.component.html',
  styleUrl: './members-panel.component.css'
})
export class MembersPanelComponent implements OnInit{
  @Input()
  groupId!: number;
  role: string | null = '';
  members: User[] = [] as User[];

  constructor(
    private authenticationService: AuthenticationService,
    private groupService: GroupService) {
  }

  ngOnInit() {
    this.getRole();
    this.loadMembers();
  }

  getRole(){
    this.authenticationService.roleState.subscribe((result) => {
      this.role = result;
    });
  }

  loadMembers(){
    this.groupService.getMembers(this.groupId).subscribe({
      next: (members: User[]) => {
        this.members = members;
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  openAddMemberDialog() {

  }
}
