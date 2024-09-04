import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgnoreNotificationsComponent } from './ignore-notifications.component';

describe('IgnoreNotificationsComponent', () => {
  let component: IgnoreNotificationsComponent;
  let fixture: ComponentFixture<IgnoreNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IgnoreNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IgnoreNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
