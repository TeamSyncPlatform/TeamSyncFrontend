import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {CoreModule} from "./core/core.module";
import {FeatureModule} from "./feature/feature.module";
import {SharedModule} from "./shared/shared.module";
import {AuthConfig, OAuthModule, OAuthStorage} from "angular-oauth2-oidc";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {StatehandlerService, StatehandlerServiceImpl} from "./core/zitadel/statehandler.service";
import {
  StatehandlerProcessorService,
  StatehandlerProcessorServiceImpl
} from "./core/zitadel/statehandler-processor.service";
import {StorageService} from "./core/zitadel/storage.service";
import {Interceptor} from "./core/zitadel/interceptor";

const authConfig: AuthConfig = {
  scope: 'openid profile email offline_access',
  responseType: 'code',
  oidc: true,
  clientId: '279559308100829190@p2-app',
  issuer: 'https://zitadel.tiacgroup.com', // eg. https://acme-jdo9fs.zitadel.cloud
  redirectUri: 'http://localhost:4200/auth/callback',
  postLogoutRedirectUri: 'http://localhost:4200/signedout',
  requireHttps: false, // required for running locally
};

const stateHandlerFn = (stateHandler: StatehandlerService) => {
  return () => {
    return stateHandler.initStateHandler();
  };
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeatureModule,
    SharedModule,

    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['https://zitadel.tiacgroup.com/admin/v1', 'https://zitadel.tiacgroup.com/management/v1', 'https://zitadel.tiacgroup.com/auth/v1'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: stateHandlerFn,
      multi: true,
      deps: [StatehandlerService],
    },
    {
      provide: AuthConfig,
      useValue: authConfig,
    },
    {
      provide: StatehandlerProcessorService,
      useClass: StatehandlerProcessorServiceImpl,
    },
    {
      provide: StatehandlerService,
      useClass: StatehandlerServiceImpl,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
    // {
    //   provide: OAuthStorage,
    //   useClass: StorageService,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
