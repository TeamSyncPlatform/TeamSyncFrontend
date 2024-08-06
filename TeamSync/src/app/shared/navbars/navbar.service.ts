import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  currentPath$ = new BehaviorSubject("");
  currentPathState = this.currentPath$.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.currentPath$.next(this.getFirstPathSegment(this.router.url));
  }

  private getFirstPathSegment(url: string): string {
    const urlSegments = url.split('/');
    return urlSegments[1] || '';
  }
}
