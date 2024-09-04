import {Component, inject} from '@angular/core';
import {User} from "../../../shared/users/models/user.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../shared/users/user.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {ActivatedRoute} from "@angular/router";
import {EditUserDialogComponent} from "../../user/edit-user-dialog/edit-user-dialog.component";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent {
  loggedUser!: User;
  userEmail!: string | null;

  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userEmail = this.route.snapshot.paramMap.get('email');
    this.getLoggedUser();
  }


  getLoggedUser(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.getByExternalId(userId).subscribe({
          next: (user: User) => {
            this.loggedUser = user;
          }
        });
      }
    });
  }

}
