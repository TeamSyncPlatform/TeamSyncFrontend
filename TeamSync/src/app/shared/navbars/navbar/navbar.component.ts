import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../core/zitadel/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  role: string | null = 'user';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authenticationService.getUserRole().subscribe({
      next: (role: string | null) => {
        this.role = role;
        console.log(this.role);
      },
      error: (_) => {
        console.log("Error!");
      }
    });
    // this.authService.userState.subscribe((result) => {
    //   this.role = result;
    // })
  }
}
