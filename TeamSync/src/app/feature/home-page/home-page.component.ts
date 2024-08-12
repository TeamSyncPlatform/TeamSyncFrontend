import { Component } from '@angular/core';
import {UserService} from "../../shared/users/user.service";
import {User} from "../../shared/users/models/user.model";
import {Channel} from "../models/channel/channel.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  activeChannel:Channel = {} as Channel;

  onChannelClicked(channel: Channel) {
    this.activeChannel = channel
  }

  constructor(private userService: UserService) {
  }
}
