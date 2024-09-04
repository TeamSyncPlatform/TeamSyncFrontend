import {Component, inject, Inject, OnInit} from '@angular/core';
import {Channel} from "../../../models/channel/channel.model";
import {ChannelService} from "../../../services/channel.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../../shared/users/models/user.model";
import {GroupService} from "../../../services/group.service";
import {UserService} from "../../../../shared/users/user.service";
import {response} from "express";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Group} from "../../../models/group/group.model";

@Component({
  selector: 'app-add-members-dialog',
  templateUrl: './add-members-dialog.component.html',
  styleUrl: './add-members-dialog.component.css'
})
export class AddMembersDialogComponent implements OnInit{
  private readonly _formBuilder = inject(FormBuilder);
  groupId: number;
  users: User[] = [] as User[];
  usersForm: FormGroup;
  searchValue: string = '';

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<AddMembersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.groupId = data.groupId;
    this.usersForm = this._formBuilder.group({});
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.userService.searchUsersToAdd(this.groupId, this.searchValue).subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.initializeForm();
      },
      error: (error) => {
        console.error("Error removing channel:", error);
      }
    });
  }

  initializeForm() {
    this.users.forEach(user => {
      this.usersForm.addControl(user.id.toString(), this._formBuilder.control(false));
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  async onConfirmClick(): Promise<void> {
    const userPromises = Object.keys(this.usersForm.controls)
      .filter(userId => this.usersForm.controls[userId].value)
      .map(userId => this.addMember(Number(userId)));

    try {
      await Promise.all(userPromises);
      this.dialogRef.close(true);
    } catch (error) {
      console.error("Error adding members:", error);
    }
  }

  addMember(userId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      this.groupService.addMember(this.groupId, userId).subscribe({
        next: (response) => {
          console.log("Member added successfully:", response);
          resolve();
        },
        error: (error) => {
          console.error("Error adding member:", error);
          reject(error);
        }
      });
    });
  }


  anyUserSelected(): boolean {
    return Object.values(this.usersForm.controls).some(control => control.value);
  }

  searchUsers(): void {
    this.userService.searchUsersToAdd(this.groupId, this.searchValue).subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (_) => {
        console.log('Error!');
      },
    });
  }

  onValueChange(newValue : string) {
    this.searchValue = newValue;
    this.searchUsers();
  }
}
