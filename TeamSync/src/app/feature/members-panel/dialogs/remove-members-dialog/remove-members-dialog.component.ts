import {Component, Inject, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../../shared/users/models/user.model";
import {UserService} from "../../../../shared/users/user.service";
import {GroupService} from "../../../services/group.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Group} from "../../../models/group/group.model";

@Component({
  selector: 'app-remove-members-dialog',
  templateUrl: './remove-members-dialog.component.html',
  styleUrl: './remove-members-dialog.component.css'
})
export class RemoveMembersDialogComponent implements OnInit{
  private readonly _formBuilder = inject(FormBuilder);
  group: Group;
  users: User[] = [] as User[];
  usersForm: FormGroup;
  searchValue: string = '';

  constructor(
    private userService: UserService,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<RemoveMembersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.group = data.group;
    this.usersForm = this._formBuilder.group({});
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.groupService.searchGroupMembersForDeletion(this.group.id, this.searchValue).subscribe({
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
      .map(userId => this.removeMember(Number(userId)));

    try {
      const results = await Promise.all(userPromises);
      this.dialogRef.close(results); // Optionally pass some result
    } catch (error) {
      console.error("Error removing members:", error);
    }
  }

  removeMember(userId: number): Promise<number | null> {
    return new Promise((resolve, reject) => {
      this.groupService.removeMember(this.group.id, userId).subscribe({
        next: (response) => {
          console.log("Member removed successfully:", response);
          resolve(userId);
        },
        error: (error) => {
          console.error("Error removing member:", error);
          reject(error);
        }
      });
    });
  }

  anyUserSelected(): boolean {
    return Object.values(this.usersForm.controls).some(control => control.value);
  }

  searchGroupMembersForDeletion(): void {
    this.groupService.searchGroupMembersForDeletion(this.group.id, this.searchValue).subscribe({
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
    this.searchGroupMembersForDeletion();
  }
}
