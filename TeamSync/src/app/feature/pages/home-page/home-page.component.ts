import { Component } from '@angular/core';
import {UserService} from "../../../shared/users/user.service";
import {User} from "../../../shared/users/models/user.model";
import {Channel} from "../../models/channel/channel.model";
import {group} from "@angular/animations";
import {channel} from "node:diagnostics_channel";
import {Group} from "../../models/group/group.model";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  activeChannel : Channel | undefined;
  activeGroup!: Group

  onChannelClicked(channel: Channel) {
    this.activeChannel = channel
    this.loadGroup(this.activeChannel.group.id);
    console.log("CHANNEL: ", this.activeChannel);
  }

  constructor(private userService: UserService, private groupService: GroupService) {
  }

  loadGroup(id: number){
    this.groupService.get(id).subscribe({
      next: (group: Group) => {
        this.activeGroup = group
      },
      error: (error) => {
        console.error("Error getting group", error);
      }
    });
  }
}
