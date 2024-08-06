import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private currentPath$ = new BehaviorSubject<string>("");
  currentPathState = this.currentPath$.asObservable();

  constructor(private router: Router) {
    this.updateCurrentPath(this.router.url);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentPath(event.urlAfterRedirects);
      }
    });
  }

  private updateCurrentPath(url: string) {
    this.currentPath$.next(this.getFirstPathSegment(url));
  }

  private getFirstPathSegment(url: string): string {
    const urlSegments = url.split('/');
    return urlSegments[1] || '';
  }
}
