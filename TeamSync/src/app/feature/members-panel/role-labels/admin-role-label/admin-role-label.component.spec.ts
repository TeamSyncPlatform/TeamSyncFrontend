import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleLabelComponent } from './admin-role-label.component';

describe('AdminRoleLabelComponent', () => {
  let component: AdminRoleLabelComponent;
  let fixture: ComponentFixture<AdminRoleLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminRoleLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
