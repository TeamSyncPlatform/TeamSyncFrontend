import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent implements OnInit{
  private currentPath: String = '';

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.currentPathState.subscribe((result) => {
      this.currentPath = result;
      console.log(this.currentPath);
    })
  }

  isSelected(path: string): boolean {
    return this.currentPath === path;
  }

  unreadNotifications: number = 2;

  openAccountPage() {

  }

  openNotificationsPage() {

  }


}
