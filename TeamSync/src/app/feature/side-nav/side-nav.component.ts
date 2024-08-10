import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Channel} from "../models/channel.model";
import {Group} from "../models/group.model";
import {GroupService} from "../services/group.service";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
  groups: Group[] = [];
  dropdowns: Map<number, boolean> = new Map();

  @Output()
  channelClicked: EventEmitter<Channel> = new EventEmitter<Channel>();

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.loadGroups();
  }

  toggleDropdown(groupId: number) {
    const isOpen = this.dropdowns.get(groupId) || false;
    this.dropdowns.set(groupId, !isOpen);
  }

  selectChannel(channel: Channel) {
    console.log('Selected channel:', channel);
    this.channelClicked.emit(channel);
  }

  loadGroups() {
    this.groupService.getAllDummy().subscribe({
      next: (groups: Group[]) => {
        this.groups = groups;
        // Initialize dropdown states for all groups
        this.groups.forEach(group => this.dropdowns.set(group.id, false));
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }
}
