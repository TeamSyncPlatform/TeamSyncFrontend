import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {Channel} from "../models/channel.model";

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Company',
    children: [{name: 'General'}, {name: 'VIP'}, {name: 'Games'}],
  },
  {
    name: 'School',
    children: [{name: 'Classes'}, {name: 'Hangout'}]
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  isDropdownOpen = false;

  channels: Channel[] = [
    { id: 1, name: 'General', group: { id: 1}, posts: [] },
    { id: 2, name: 'Announcements', group: { id: 1}, posts: [] },
    { id: 3, name: 'Development', group: { id: 1}, posts: [] },
    // Add more channels as needed
  ];

  @Output()
  channelClicked: EventEmitter<Channel> = new EventEmitter<Channel>();

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectChannel(channel: Channel) {
    console.log('Selected channel:', channel);
    this.channelClicked.emit(channel);
  }
}
