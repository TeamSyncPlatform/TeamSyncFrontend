import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './navbars/user-navbar/user-navbar.component';
import {MatBadge} from "@angular/material/badge";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";



@NgModule({
  declarations: [
    NavbarComponent,
    AdminNavbarComponent,
    UserNavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatBadge,
    MatIcon,
    MatIconButton
  ]
})
export class SharedModule { }
