import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../shared/users/models/user.model";
import {UserService} from "../../../shared/users/user.service";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MatChipEditedEvent} from '@angular/material/chips';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UpdateUserDTO} from "../../../shared/users/models/update-user-dto.model";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {
  userForm: FormGroup;
  readonly addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: [''],
      department: [''],
      jobTitle: [''],
      skills: [this.skills]
    });
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
      this.skills = [...this.data.user.skills];
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.getRawValue();

      const updatedUser: UpdateUserDTO = {
        id: this.data.user.id,
        email: this.data.user.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        address: formValues.address,
        phoneNumber: formValues.phoneNumber,
        department: formValues.department,
        jobTitle: formValues.jobTitle,
        skills: this.skills
      };

      this.userService.update(updatedUser).subscribe({
        next: (user: User) => {
          this.dialogRef.close(user);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        }
      });
    }
  }

  addSkill(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
