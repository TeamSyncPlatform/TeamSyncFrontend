import {Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Group} from "../../models/group/group.model";
import {Channel} from "../../models/channel/channel.model";
import {User} from "../../../shared/users/models/user.model";
import {Post} from "../../models/post/post.model";
import {Observable, Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ChannelService} from "../../services/channel.service";
import {PostService} from "../../services/post.service";
import {CreatePostDialogComponent} from "../dialogs/create-post-dialog/create-post-dialog.component";

@Component({
  selector: 'app-user-posts-panel',
  templateUrl: './user-posts-panel.component.html',
  styleUrl: './user-posts-panel.component.css'
})
export class UserPostsPanelComponent implements OnInit{
  @Input() user!: User;
  @ViewChild('contentDiv') contentDiv!: ElementRef;

  posts!: Post[];

  readonly dialog = inject(MatDialog);

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.loadData();
  }

  onPostDeletion(post: Post) {
    this.loadData();
  }

  //INFINITE SCROLL
  isLoading=false;
  currentPage=0;
  itemsPerPage=10;

  toggleLoading = ()=>this.isLoading=!this.isLoading;

  loadData = () => {
    this.toggleLoading();
    this.postService.getUserPaginatedPosts(this.user!.id, this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.posts = response.content;
      },
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }

  appendData = () => {
    console.log("append called");
    this.toggleLoading();
    this.postService.getUserPaginatedPosts(this.user!.id, this.currentPage, this.itemsPerPage).subscribe({
      next: (response: any) => {
        this.posts = [...this.posts, ...response.content];
      },
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }

  onScroll= ()=>{
    this.currentPage++;
    this.appendData();
  }

}
