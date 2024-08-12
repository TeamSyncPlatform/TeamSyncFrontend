import { Component } from '@angular/core';
import {UserService} from "../../shared/users/user.service";
import {User} from "../../shared/users/models/user.model";
import {Channel} from "../models/channel/channel.model";
import {group} from "@angular/animations";
import {channel} from "node:diagnostics_channel";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  activeChannel : Channel | undefined;

  onChannelClicked(channel: Channel) {
    this.activeChannel = channel
    console.log("CHANNEL: ", this.activeChannel);
  }

  constructor(private userService: UserService) {
  }
}
