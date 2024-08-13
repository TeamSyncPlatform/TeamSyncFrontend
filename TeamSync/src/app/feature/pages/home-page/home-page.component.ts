import {Component, EventEmitter, Output} from '@angular/core';
import {UserService} from "../../../shared/users/user.service";
import {User} from "../../../shared/users/models/user.model";
import {Channel} from "../../models/channel/channel.model";
import {group} from "@angular/animations";
import {channel} from "node:diagnostics_channel";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  activeChannel : Channel | undefined;
  activeGroup: Group | undefined;

  public leaveEventsSubject: Subject<void> = new Subject<void>();

  onChannelClicked(channel: Channel) {
    this.activeChannel = channel
    this.loadGroup(this.activeChannel.group.id);
    console.log("CHANNEL: ", this.activeChannel);
  }

  onGroupLeave(){
    this.activeChannel = undefined;
    this.activeGroup = undefined;
    this.leaveEventsSubject.next();
    //signal here
  }

  constructor(private userService: UserService, private groupService: GroupService) {
  }

  loadGroup(id: number){
    this.groupService.get(id).subscribe({
      next: (group: Group) => {
        this.activeGroup = group
        console.log(this.activeGroup);
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    });
  }
}
