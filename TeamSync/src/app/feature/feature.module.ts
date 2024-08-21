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
import { AddMembersDialogComponent } from './members-panel/dialogs/add-members-dialog/add-members-dialog.component';
import {MatCheckbox} from "@angular/material/checkbox";
import { RemoveMembersDialogComponent } from './members-panel/dialogs/remove-members-dialog/remove-members-dialog.component';
import { OwnerRoleLabelComponent } from './members-panel/role-labels/owner-role-label/owner-role-label.component';
import { LeaveGroupDialogComponent } from './members-panel/dialogs/leave-group-dialog/leave-group-dialog.component';
import { PostCardComponent } from './posts-panel/post-card/post-card.component';
import { PostsCardsComponent } from './posts-panel/posts-cards/posts-cards.component';
import { PostsPanelComponent } from './posts-panel/posts-panel/posts-panel.component';
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import {MatTooltip} from "@angular/material/tooltip";
import {EditorComponent} from "@tinymce/tinymce-angular";
import { CreatePostDialogComponent } from './posts-panel/dialogs/create-post-dialog/create-post-dialog.component';
import { ReactionsComponent } from './posts-panel/reaction-buttons/reactions/reactions.component';
import {MatChip, MatChipGrid, MatChipInput, MatChipRow, MatChipSet} from "@angular/material/chips";
import { CommentCardsComponent } from './posts-panel/comments/comment-cards/comment-cards.component';
import { CommentCardComponent } from './posts-panel/comments/comment-card/comment-card.component';
import { CommentsSectionComponent } from './posts-panel/comments/comments-section/comments-section.component';
import { AddCommentComponent } from './posts-panel/comments/add-comment/add-comment.component';
import { CommentReactionsComponent } from './posts-panel/reaction-buttons/comment-reactions/comment-reactions.component';
import { EditPostDialogComponent } from './posts-panel/dialogs/edit-post-dialog/edit-post-dialog.component';
import { RemovePostDialogComponent } from './posts-panel/dialogs/remove-post-dialog/remove-post-dialog.component';
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserPostsPanelComponent } from './user/user-posts-panel/user-posts-panel.component';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';



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
    UserRoleLabelComponent,
    AddMembersDialogComponent,
    RemoveMembersDialogComponent,
    OwnerRoleLabelComponent,
    LeaveGroupDialogComponent,
    PostCardComponent,
    PostsCardsComponent,
    PostsPanelComponent,
    CreatePostDialogComponent,
    ReactionsComponent,
    CommentCardsComponent,
    CommentCardComponent,
    CommentsSectionComponent,
    AddCommentComponent,
    CommentReactionsComponent,
    EditPostDialogComponent,
    RemovePostDialogComponent,
    ProfilePageComponent,
    UserPostsPanelComponent,
    EditUserDialogComponent,
    SettingsPageComponent,
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
    MatDialogClose,
    MatCheckbox,
    MatMenu,
    MatMenuTrigger,
    MatTooltip,
    EditorComponent,
    MatChipSet,
    MatChip,
    InfiniteScrollDirective,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatList,
    MatListItem,
    MatLine,
    MatCardActions,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatChipInput,
    MatChipGrid,
    MatChipRow,
  ]
})
export class FeatureModule { }
