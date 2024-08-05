import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    MatButton,
    MatToolbar,
    MatIcon,
    RouterLink
  ]
})
export class FeatureModule { }
