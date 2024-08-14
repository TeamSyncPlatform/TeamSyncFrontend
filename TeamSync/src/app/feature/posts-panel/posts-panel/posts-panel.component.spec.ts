import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsPanelComponent } from './posts-panel.component';

describe('PostsPanelComponent', () => {
  let component: PostsPanelComponent;
  let fixture: ComponentFixture<PostsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
