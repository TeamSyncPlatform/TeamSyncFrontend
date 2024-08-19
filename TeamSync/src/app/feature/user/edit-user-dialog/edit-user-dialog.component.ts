import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../shared/users/models/user.model';
import { UserService } from '../../../shared/users/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateUserDTO } from '../../../shared/users/models/update-user-dto.model';
import {Image} from "../../../shared/users/models/image.model";

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
  profileImageUrl: string | ArrayBuffer = 'assets/default-profile-image.png'; // Default image
  profileImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
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
      this.loadProfileImage();
    }
  }

  loadProfileImage(): void {
    if (this.data.user && this.data.user.profileImage) {
      const profileImage: Image = this.data.user.profileImage; // Assuming the first image is the profile image
      this.userService.getProfileImage(profileImage.id).subscribe({
        next: (imageBlob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.profileImageUrl = reader.result as string;
          };
          reader.readAsDataURL(imageBlob);
        },
        error: () => {
          console.error('Error loading profile image');
        }
      });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadProfileImage(userId: number): Promise<void> {
    if (this.profileImageFile) {
      const formData = new FormData();
      formData.append('file', this.profileImageFile);

      try {
        const user = await this.userService.uploadProfileImage(userId, formData).toPromise();
        console.log("Profile image uploaded successfully:", user);
      } catch (error) {
        console.error("Error uploading profile image:", error);
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onEditClick(): Promise<void> {
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

      try {
        const user = await this.userService.update(updatedUser).toPromise();
        await this.uploadProfileImage(user!.id);
        this.dialogRef.close(true);
      } catch (error) {
        console.error('Error updating user:', error);
      }
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
