import {Component, inject, OnInit} from '@angular/core';
import {Channel} from "../../models/channel/channel.model";
import {Group} from "../../models/group/group.model";
import {User} from "../../../shared/users/models/user.model";
import {Subject} from "rxjs";
import {UserService} from "../../../shared/users/user.service";
import {GroupService} from "../../services/group.service";
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {CreatePostDialogComponent} from "../../posts-panel/dialogs/create-post-dialog/create-post-dialog.component";
import {EditUserDialogComponent} from "../../user/edit-user-dialog/edit-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  loggedUser!: User;

  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.getByExternalId(userId).subscribe({
          next: (user: User) => {
            this.loggedUser = user;
            // this.loggedUser.skills = ["Java", "SpringBoot", "Angular", "SQL"];
          }
        });
      }
    });
  }

  openEditUserDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        user: this.loggedUser,
      },
      // width: '90vw',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getLoggedUser();
      }
    });
  }
}
