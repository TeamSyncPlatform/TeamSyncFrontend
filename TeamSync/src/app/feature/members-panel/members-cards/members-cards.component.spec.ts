import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersCardsComponent } from './members-cards.component';

describe('MembersCardsComponent', () => {
  let component: MembersCardsComponent;
  let fixture: ComponentFixture<MembersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MembersCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
