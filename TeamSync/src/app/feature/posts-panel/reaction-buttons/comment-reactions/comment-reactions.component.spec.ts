import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentReactionsComponent } from './comment-reactions.component';

describe('CommentReactionsComponent', () => {
  let component: CommentReactionsComponent;
  let fixture: ComponentFixture<CommentReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentReactionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
