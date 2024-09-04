import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveGroupDialogComponent } from './leave-group-dialog.component';

describe('LeaveGroupDialogComponent', () => {
  let component: LeaveGroupDialogComponent;
  let fixture: ComponentFixture<LeaveGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaveGroupDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
