import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePostDialogComponent } from './remove-post-dialog.component';

describe('RemovePostDialogComponent', () => {
  let component: RemovePostDialogComponent;
  let fixture: ComponentFixture<RemovePostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemovePostDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
