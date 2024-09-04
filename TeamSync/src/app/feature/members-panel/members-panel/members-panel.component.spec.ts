import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersPanelComponent } from './members-panel.component';

describe('MembersPanelComponent', () => {
  let component: MembersPanelComponent;
  let fixture: ComponentFixture<MembersPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
