import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  role: string = 'USER';

  // constructor(private authService: AuthService) {
  // }
  // ngOnInit(): void {
  //   this.authService.userState.subscribe((result) => {
  //     this.role = result;
  //   })
  // }
}
