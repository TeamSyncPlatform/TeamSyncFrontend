import { Component, EventEmitter, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {Channel} from "../models/channel.model";
import {Group} from "../models/group.model";
import {GroupService} from "../services/group.service";

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl} from "@angular/forms";
import {UserService} from "../../shared/users/user.service";
import {AuthenticationService} from "../../core/zitadel/authentication.service";
import {User} from "../../shared/users/models/user.model";


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  groups: Group[] = [];
  dropdowns: Map<number, boolean> = new Map();
  channels:  Map<number, Channel[]> = new Map();
  selectedChannel: Channel = {"group":{}} as Channel;

  @Output()
  channelClicked: EventEmitter<Channel> = new EventEmitter<Channel>();

  searchControl = new FormControl('');
  searchValue: string = '';
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private authenticationService:AuthenticationService,
    private groupService: GroupService) {}

  ngOnInit() {
    this.searchGroups();
  }

  toggleDropdown(groupId: number) {
    const isOpen = this.dropdowns.get(groupId) || false;
    if(!isOpen){
      this.loadChannels(groupId);
    }
    this.dropdowns.set(groupId, !isOpen);
  }

  selectChannel(channel: Channel) {
    console.log('Selected channel:', channel);
    this.channelClicked.emit(channel);
    this.selectedChannel = channel;
    console.log(this.selectedChannel);
  }

  searchGroups(): void {
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.searchGroups(userId, this.searchValue).subscribe({
          next: (groups: Group[]) => {
            this.groups = groups;
            this.groups.forEach(group => this.dropdowns.set(group.id, false));
          },
          error: (_) => {
            console.log('Error!');
          },
        });
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

  onValueChange(newValue : string) {
    this.searchValue = newValue;
    this.searchGroups();
  }

  loadChannels(id: number){
    this.groupService.getGroupChannels(id).subscribe({
      next: (channels: Channel[]) => {
        this.channels.set(id, channels);
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }
}
