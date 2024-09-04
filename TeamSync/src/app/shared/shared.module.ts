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
import { IgnoreNotificationsComponent } from './notifications/ignore-notifications/ignore-notifications.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    NavbarComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    NotificationCardComponent,
    IgnoreNotificationsComponent
  ],
  exports: [
    NavbarComponent,
    IgnoreNotificationsComponent
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
    MatMenuTrigger,
    MatSlideToggle,
    FormsModule
  ]
})
export class SharedModule { }
