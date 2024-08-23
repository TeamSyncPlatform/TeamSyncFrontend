import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../../models/post/post.model";
import {User} from "../../../../shared/users/models/user.model";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../models/comment/comment.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../../../../shared/users/user.service";
import {Router} from "@angular/router";
import {Group} from '../../../models/group/group.model';
import {MentionConfig} from "angular-mentions";
import {CreateCommentRequest} from "../../../models/comment/create-comment-request.model";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit{
  @Input() post!: Post;
  @Input() loggedUser!: User;
  content: string = '';
  @Output() commentAdded = new EventEmitter<Comment>();
  profileImageUrl: SafeUrl | string = '/default-profile-image.png';

  users: User[] = [];
  @Input() group!: Group;

  items : any[] = [];
  public htmlTextArea!: HTMLElement;

  mentionConfig : MentionConfig = {
    items: [],
    labelKey: "label",
    triggerChar: "@",
    mentionSelect: (item: any, triggerChar?: string | undefined) => {
      let user: User = item.user;
      return `##${item.label}##${user.id}##`;
    },
  }

  itemSelected(event: any) {
    console.log("Item selected event activated");
    setTimeout(() => {
      this.htmlTextArea = document.getElementById('comment-textarea') as HTMLElement;
      console.log("innerHTML: ", this.htmlTextArea.innerHTML);
      const regex = new RegExp(`##${event.label}##(\\d+)##`, 'g');
      this.htmlTextArea.innerHTML = this.htmlTextArea.innerHTML.replace(
        regex,
        (_, userId) =>
          `<b style="color:#0056b3;" contenteditable="false" data-user-id="${userId}">${event.label}</b>&nbsp;`
      );
      this.selectEnd();
    }, 10);
  }

  selectEnd() {
    let range, selection;
    range = document.createRange();
    range.selectNodeContents(this.htmlTextArea);
    range.collapse(false);
    selection = window.getSelection();
    if(selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  constructor(private commentService: CommentService,
              private sanitizer: DomSanitizer,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadProfileImage();
    this.searchUsers();
  }


  onSendClick() {
    // console.log(this.htmlTextArea.innerHTML)
    const createCommentRequest : CreateCommentRequest = {
      author: this.loggedUser,
      content: this.htmlTextArea.innerHTML,
      post: this.post
    };

    this.commentService.create(createCommentRequest).subscribe({
      next: (response: Comment) => {
        this.commentAdded.emit(response);
        this.content = '';
        console.log("Channel created successfully:", response);
      },
      error: (error) => {
        console.error("Error creating channel:", error);
      }
    });
  }

  loadProfileImage() {
    if (this.loggedUser.profileImage.id) {
      this.userService.getProfileImage(this.loggedUser.profileImage.id).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          console.error('Error loading profile image:', err);
          this.profileImageUrl = '/default-profile-image.png';
        }
      });
    } else {
      this.profileImageUrl = '/default-profile-image.png';
    }
  }

  goToProfilePage() {
    this.router.navigate(['/profile', this.loggedUser.email]);
  }

  searchUsers(searchValue: string = ''){
    this.userService.searchUsersInGroup(this.group.id, searchValue).subscribe(users => {
      this.users = users;
      this.items = users.map(user => ({
        "label" : `${user.firstName}${user.lastName}`,
        'user' : user
      }));
      // this.mentionConfig.items = users.map(user => `${user.firstName} ${user.lastName}`);
    });
  }
}
