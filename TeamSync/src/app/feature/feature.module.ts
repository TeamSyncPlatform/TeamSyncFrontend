import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatBadge} from "@angular/material/badge";
import {SharedModule} from "../shared/shared.module";
import { AnalyticsPageComponent } from './pages/analytics-page/analytics-page.component';
import { SideNavComponent } from './groups-panel/side-nav/side-nav.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogActions, MatDialogClose, MatDialogContent} from "@angular/material/dialog";
import { MemberCardComponent } from './members-panel/member-card/member-card.component';
import { MembersCardsComponent } from './members-panel/members-cards/members-cards.component';
import { MembersPanelComponent } from './members-panel/members-panel/members-panel.component';
import { AdminRoleLabelComponent } from './members-panel/role-labels/admin-role-label/admin-role-label.component';
import { UserRoleLabelComponent } from './members-panel/role-labels/user-role-label/user-role-label.component';
import {CreateGroupDialogComponent} from "./groups-panel/dialogs/create-group-dialog/create-group-dialog.component";
import {
  CreateChannelDialogComponent
} from "./groups-panel/dialogs/create-channel-dialog/create-channel-dialog.component";
import {
  RemoveChannelDialogComponent
} from "./groups-panel/dialogs/remove-channel-dialog/remove-channel-dialog.component";
import {RemoveGroupDialogComponent} from "./groups-panel/dialogs/remove-group-dialog/remove-group-dialog.component";



@NgModule({
  declarations: [
    HomePageComponent,
    AnalyticsPageComponent,
    SideNavComponent,
    CreateGroupDialogComponent,
    CreateChannelDialogComponent,
    RemoveChannelDialogComponent,
    RemoveGroupDialogComponent,
    MemberCardComponent,
    MembersCardsComponent,
    MembersPanelComponent,
    AdminRoleLabelComponent,
    UserRoleLabelComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatToolbar,
    MatIcon,
    RouterLink,
    MatBadge,
    MatFabButton,
    MatIconButton,
    SharedModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ]
})
export class FeatureModule { }
