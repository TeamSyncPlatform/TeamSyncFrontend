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
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatTreeModule} from '@angular/material/tree';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    HomePageComponent,
    AnalyticsPageComponent,
    SideNavComponent
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
    FormsModule
  ]
})
export class FeatureModule { }
