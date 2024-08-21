import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarService} from "../navbar.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {UserService} from "../../users/user.service";
import {User} from "../../users/models/user.model";
import {Notification} from "../../notifications/models/notification.model";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent implements OnInit{
  private currentPath: String = '';

  @Input() notificationsBadge!: string;
  @Input() loggedUser!: User;
  @Input() notifications!: Notification[];

  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() readAllClicked = new EventEmitter<void>();
  @Output() readClicked = new EventEmitter<void>();

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

  onNotificationsClicked() {
    this.notificationsClicked.emit();
  }

  logout() {
    this.authenticationService.signout();
  }

  openSettingsPage() {
    this.router.navigate(['/settings', this.loggedUser.email]);
  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.loggedUser.email]);
  }

  onReadAllClicked() {
    this.readAllClicked.emit();
  }

  onReadClicked($event: any) {
    this.readClicked.emit();
  }
}
