import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveMembersDialogComponent } from './remove-members-dialog.component';

describe('RemoveMembersDialogComponent', () => {
  let component: RemoveMembersDialogComponent;
  let fixture: ComponentFixture<RemoveMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveMembersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
