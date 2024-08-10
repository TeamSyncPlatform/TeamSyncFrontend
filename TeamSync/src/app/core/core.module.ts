import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './zitadel/components/user/user.component';
import { SignedOutComponent } from './zitadel/components/signed-out/signed-out.component';



@NgModule({
  declarations: [
    UserComponent,
    SignedOutComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UserComponent,
    SignedOutComponent,
  ]
})
export class CoreModule { }
