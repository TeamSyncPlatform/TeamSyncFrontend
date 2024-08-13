import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerRoleLabelComponent } from './owner-role-label.component';

describe('OwnerRoleLabelComponent', () => {
  let component: OwnerRoleLabelComponent;
  let fixture: ComponentFixture<OwnerRoleLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OwnerRoleLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerRoleLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
