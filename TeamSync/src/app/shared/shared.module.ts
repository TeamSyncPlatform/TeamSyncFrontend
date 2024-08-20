import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './navbars/user-navbar/user-navbar.component';
import {MatBadge} from "@angular/material/badge";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import { NotificationCardComponent } from './notifications/notification-card/notification-card.component';



@NgModule({
  declarations: [
    NavbarComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    NotificationCardComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatBadge,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ]
})
export class SharedModule { }
