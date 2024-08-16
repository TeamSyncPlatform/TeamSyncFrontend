import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCardsComponent } from './comment-cards.component';

describe('CommentCardsComponent', () => {
  let component: CommentCardsComponent;
  let fixture: ComponentFixture<CommentCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
