import {Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Group } from '../../models/group/group.model';
import { Channel } from '../../models/channel/channel.model';
import {LeaveGroupDialogComponent} from "../../members-panel/dialogs/leave-group-dialog/leave-group-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../dialogs/create-post-dialog/create-post-dialog.component";
import {Post} from "../../models/post/post.model";
import {User} from "../../../shared/users/models/user.model";
import {ChannelService} from "../../services/channel.service";
import {PostService} from "../../services/post.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-posts-panel',
  templateUrl: './posts-panel.component.html',
  styleUrl: './posts-panel.component.css'
})
export class PostsPanelComponent implements OnInit, OnDestroy{
  @Input() group!: Group | undefined;
  @Input() channel!: Channel | undefined;
  @Input() loggedUser!: User;
  @ViewChild('contentDiv') contentDiv!: ElementRef;

  posts!: Post[];

  private eventsSubscription!: Subscription;
  @Input() events!: Observable<Channel>;

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  readonly dialog = inject(MatDialog);

  constructor(private channelService: ChannelService, private postService: PostService) {
  }

  ngOnInit() {
    this.loadData();
    this.eventsSubscription = this.events.subscribe((channel: Channel) => {
      this.channel = channel;
      this.loadData();
    });
  }

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {
        channel: this.channel,
        loggedUserId: this.loggedUser.externalIdentification
      },
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.loadPosts();
        this.loadData();
        this.scrollToTop();
      }
    });
  }

  scrollToTop() {
    if (this.contentDiv) {
      this.contentDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
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
    this.postService.getChannelPaginatedPosts(this.channel!.id, this.currentPage, this.itemsPerPage).subscribe({
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
    this.postService.getChannelPaginatedPosts(this.channel!.id, this.currentPage, this.itemsPerPage).subscribe({
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
