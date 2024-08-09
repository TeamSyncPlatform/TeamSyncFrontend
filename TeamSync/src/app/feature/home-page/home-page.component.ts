import { Component } from '@angular/core';
import {UserService} from "../../shared/users/user.service";
import {User} from "../../shared/users/models/user.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor(private userService: UserService) {
  }

  onTestClick() {
    this.userService.getAll().subscribe({
      next: (users: User[]) => {
        console.log(users);
      },
      error: (_) => {
        console.log("Error!");
      }
    });

  }
}
