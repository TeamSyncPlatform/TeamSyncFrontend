import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import {GroupService} from "../../../services/group.service";

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {
  groupForm!: FormGroup;
  nameError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private dialogRef: MatDialogRef<CreateGroupDialogComponent>
  ) {}

  ngOnInit(): void {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required]]
    });

    this.groupForm.get('groupName')?.valueChanges.subscribe(value => {
      this.onGroupNameChange(value);
    });
  }

  onGroupNameChange(groupName: string): void {
    if (groupName) {
      this.groupService.isNameUnique(groupName).subscribe({
        next: (isUnique: Boolean) => {
          if (!isUnique) {
            this.nameError = 'Group name is already taken.';
            this.groupForm.get('groupName')?.setErrors({ nameTaken: true });
          } else {
            this.nameError = null;
            this.groupForm.get('groupName')?.setErrors(null);
          }
        },
        error: (error) => {
          console.error("Error checking group name:", error);
        }
      });
    } else {
      this.nameError = null;
      this.groupForm.get('groupName')?.setErrors(null);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    if (this.groupForm.valid) {
      const createGroupRequest = { name: this.groupForm.value.groupName };
      this.groupService.create(createGroupRequest).subscribe({
        next: (response) => {
          console.log("Group created successfully:", response);
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error("Error creating group:", error);
        }
      });
    }
  }
}
