import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarService} from "../navbar.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {UserService} from "../../users/user.service";
import {User} from "../../users/models/user.model";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent implements OnInit{
  private currentPath: String = '';

  @Input()
  loggedUser!: User;

  constructor(
    private navbarService: NavbarService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.navbarService.currentPathState.subscribe((result) => {
      this.currentPath = result;
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
  }

  openSettingsPage() {

  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.loggedUser.email]);
  }
}
