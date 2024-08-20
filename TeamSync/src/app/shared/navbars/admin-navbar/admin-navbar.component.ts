import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavbarService} from "../navbar.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../users/models/user.model";
import {Router} from "@angular/router";
import {Notification} from "../../notifications/models/notification.model";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent implements OnInit{
  private currentPath: String = '';

  @Input() loggedUser!: User;
  @Input() notificationsBadge!: string;
  @Input() notifications!: Notification[];
  @Output() notificationsClicked = new EventEmitter<void>();
  @Output() readAllClicked = new EventEmitter<void>();
  @Output() readClicked = new EventEmitter<void>();

  constructor(
    private navbarService: NavbarService,
    private authenticationService:AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.navbarService.currentPathState.subscribe((result) => {
      this.currentPath = result;
    })
  }

  isSelected(path: string): boolean {
    return this.currentPath === path;
  }


  logout() {
    this.authenticationService.signout();
  }

  openSettingsPage() {

  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.loggedUser.email]);
  }

  onNotificationsClicked() {
    this.notificationsClicked.emit();
  }

  onReadAllClicked() {
    this.readAllClicked.emit();
  }

  onReadClicked($event: any) {
    this.readClicked.emit();
  }
}
