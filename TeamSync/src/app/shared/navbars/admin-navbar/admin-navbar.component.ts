import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../navbar.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{
  private currentPath: String = '';

  constructor(private navbarService: NavbarService, private authenticationService:AuthenticationService) {}

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

  logout() {
    this.authenticationService.signout();
    console.log("Successfully logged out")
  }

  openSettingsPage() {

  }
}
