import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleLabelComponent } from './user-role-label.component';

describe('UserRoleLabelComponent', () => {
  let component: UserRoleLabelComponent;
  let fixture: ComponentFixture<UserRoleLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRoleLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
