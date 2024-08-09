import {Component, signal} from '@angular/core';
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

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
  items = [
    { name: 'General', icon: 'fa fa-comments' },
    { name: 'Announcements', icon: 'fa fa-bullhorn' },
    { name: 'Development', icon: 'fa fa-code' },
    // Add more items as needed
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectItem(item: any) {
    console.log('Selected item:', item);
    this.isDropdownOpen = false;
  }
}
