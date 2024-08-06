import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatBadge} from "@angular/material/badge";
import {SharedModule} from "../shared/shared.module";
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';



@NgModule({
  declarations: [
    HomePageComponent,
    AnalyticsPageComponent
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
    SharedModule
  ]
})
export class FeatureModule { }
