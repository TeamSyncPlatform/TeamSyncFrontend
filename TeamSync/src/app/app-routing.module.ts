import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./feature/home-page/home-page.component";
import {AnalyticsPageComponent} from "./feature/analytics-page/analytics-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    component: HomePageComponent,
    path:"home"
  },
  {
    component: AnalyticsPageComponent,
    path:"analytics"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
