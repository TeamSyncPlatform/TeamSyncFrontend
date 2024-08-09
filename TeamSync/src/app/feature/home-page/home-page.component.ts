import { Component } from '@angular/core';
import {Channel} from "../models/channel.model";

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
}
