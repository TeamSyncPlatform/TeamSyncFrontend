import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveChannelDialogComponent } from './remove-channel-dialog.component';

describe('RemoveChannelDialogComponent', () => {
  let component: RemoveChannelDialogComponent;
  let fixture: ComponentFixture<RemoveChannelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveChannelDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveChannelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
