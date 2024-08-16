import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../users/models/user.model";
import {UserService} from "../../users/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  role: string | null = 'user';
  loggedUser: User = {} as User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getRole();
    this.getUser();
  }

  getRole(){
    this.authenticationService.getUserRole().subscribe({
      next: (role: string | null) => {
        this.role = role;
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

  getUser(){
    this.authenticationService.getUserId().subscribe({
      next: (userId: string | null) => {
        if(!userId) return;
        this.userService.getByExternalId(userId).subscribe({
          next: (user: User) => {
            this.loggedUser = user;
          },
          error: (_) => {
            console.log("Error!");
          }
        });
      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }
}
