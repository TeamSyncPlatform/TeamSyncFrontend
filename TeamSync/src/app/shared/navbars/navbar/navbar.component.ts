import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";
import {User} from "../../users/models/user.model";
import {UserService} from "../../users/user.service";
import {WebsocketService} from "../../notifications/websocket.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  role: string | null = 'user';
  loggedUser: User = {} as User;
  notificationsBadge: string = "";

  constructor(private authenticationService: AuthenticationService, private userService: UserService, private websocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.getRole();
    this.getUser();
    this.subscribeNotifications();
  }

  subscribeNotifications(){
    this.websocketService.unreadCountState.subscribe({
      next: (data: number) => {
        this.notificationsBadge = data.toString()
      }
    });
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
