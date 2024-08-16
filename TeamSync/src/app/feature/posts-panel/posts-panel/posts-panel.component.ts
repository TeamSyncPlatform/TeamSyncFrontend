import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import { Group } from '../../models/group/group.model';
import { Channel } from '../../models/channel/channel.model';
import {LeaveGroupDialogComponent} from "../../members-panel/dialogs/leave-group-dialog/leave-group-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../dialogs/create-post-dialog/create-post-dialog.component";
import {Post} from "../../models/post/post.model";
import {User} from "../../../shared/users/models/user.model";
import {ChannelService} from "../../services/channel.service";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-posts-panel',
  templateUrl: './posts-panel.component.html',
  styleUrl: './posts-panel.component.css'
})
export class PostsPanelComponent implements OnInit{
  @Input() group!: Group | undefined;
  @Input() channel!: Channel | undefined;
  @Input() loggedUser!: User;
  @ViewChild('contentDiv') contentDiv!: ElementRef;

  posts!: Post[];

  readonly dialog = inject(MatDialog);

  constructor(private channelService: ChannelService, private postService: PostService) {
  }

  ngOnInit() {
    this.loadData();
    // this.loadPosts();
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

  // loadPosts() {
  //   this.channelService.getChannelPosts(this.channel!.id).subscribe({
  //     next: (posts: Post[]) => {
  //       this.posts = posts
  //       console.log("loadedPosts: ", this.posts);
  //     },
  //     error: (error) => {
  //       console.error("Error getting group", error);
  //     }
  //   })
  // }

  onPostDeletion(post: Post) {
    this.loadData();
    // this.loadPosts();
  }

  //INFINITE SCROLL
  isLoading=false;
  currentPage=0;
  itemsPerPage=10;

  toggleLoading = ()=>this.isLoading=!this.isLoading;

  loadData = () => {
    this.toggleLoading();
    this.postService.getPaginatedPosts(this.currentPage, this.itemsPerPage).subscribe({
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
    this.postService.getPaginatedPosts(this.currentPage, this.itemsPerPage).subscribe({
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
