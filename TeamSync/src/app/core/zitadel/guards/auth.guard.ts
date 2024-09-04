import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../authentication.service";



@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService) { }

  public canActivate(
    _: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | Promise<any> | boolean {
    if (!this.auth.authenticated) {
      return this.auth.authenticate();
    }
    return this.auth.authenticated;
  }

}
