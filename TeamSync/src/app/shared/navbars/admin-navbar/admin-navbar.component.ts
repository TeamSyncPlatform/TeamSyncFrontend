import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../navbar.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{
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
