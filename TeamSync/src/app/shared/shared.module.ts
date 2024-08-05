import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './navbars/user-navbar/user-navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,
     AdminNavbarComponent,
     UserNavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
