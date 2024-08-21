import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./feature/pages/home-page/home-page.component";
import {AnalyticsPageComponent} from "./feature/pages/analytics-page/analytics-page.component";
import {AuthGuard} from "./core/zitadel/guards/auth.guard";
import {UserComponent} from "./core/zitadel/components/user/user.component";
import {SignedOutComponent} from "./core/zitadel/components/signed-out/signed-out.component";
import {ProfilePageComponent} from "./feature/pages/profile-page/profile-page.component";
import {SettingsPageComponent} from "./feature/pages/settings-page/settings-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    component: HomePageComponent,
    path:"home",
    canActivate: [AuthGuard],
  },
  {
    component: ProfilePageComponent,
    path:"profile/:email",
    canActivate: [AuthGuard],
  },
  {
    component: SettingsPageComponent,
    path:"settings/:email",
    canActivate: [AuthGuard],
  },
  {
    component: AnalyticsPageComponent,
    path:"analytics",
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/callback',
    redirectTo: 'home'
  },
  {
    path: 'signedout',
    redirectTo: 'home'
  },
  {
    path: 'signedout',
    component: SignedOutComponent
  },
  {
    path: '**',
    redirectTo: '/'
  },
];

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePageComponent,
//   },
//   {
//     path: 'user',
//     component: UserComponent,
//     canActivate: [AuthGuard],
//   },
//   {
//     path: 'auth/callback',
//     redirectTo: 'user'
//   },
//   {
//     path: 'signedout',
//     component: SignedOutComponent
//   },
//   {
//     path: '**',
//     redirectTo: '/'
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
