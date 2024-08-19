import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsPanelComponent } from './user-posts-panel.component';

describe('UserPostsPanelComponent', () => {
  let component: UserPostsPanelComponent;
  let fixture: ComponentFixture<UserPostsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPostsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
