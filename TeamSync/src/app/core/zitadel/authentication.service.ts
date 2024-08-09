import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, from, Observable } from 'rxjs';

import { StatehandlerService } from './statehandler.service';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _authenticated: boolean = false;
  private readonly _authenticationChanged: BehaviorSubject<boolean> = new BehaviorSubject(this.authenticated);

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig,
    private statehandler: StatehandlerService,
  ) {}

  public get authenticated(): boolean {
    return this._authenticated;
  }

  public get authenticationChanged(): Observable<boolean> {
    return this._authenticationChanged;
  }

  getUserRole(): Observable<string | null> {
    return this.getOIDCUser().pipe(
      map((data: any) => {
        const roles = data.info['urn:zitadel:iam:org:project:roles'];
        if (roles) {
          return Object.keys(roles)[0];
        }
        return null;
      })
    );
  }

  public getOIDCUser(): Observable<any> {
    return from(this.oauthService.loadUserProfile());
  }

  public async authenticate(setState: boolean = true): Promise<boolean> {
    this.oauthService.configure(this.authConfig);
    this.oauthService.setupAutomaticSilentRefresh();

    this.oauthService.strictDiscoveryDocumentValidation = false;
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();

    this._authenticated = this.oauthService.hasValidAccessToken();

    if (!this.oauthService.hasValidIdToken() || !this.authenticated) {
      const newState = setState ? await this.statehandler.createState().toPromise() : undefined;
      this.oauthService.initCodeFlow(newState);
    }
    this._authenticationChanged.next(this.authenticated);

    return this.authenticated;
  }

  public signout(): void {
    this.oauthService.logOut();
    this._authenticated = false;
    this._authenticationChanged.next(false);
  }
}
