import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsCardsComponent } from './posts-cards.component';

describe('PostsCardsComponent', () => {
  let component: PostsCardsComponent;
  let fixture: ComponentFixture<PostsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostsCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
