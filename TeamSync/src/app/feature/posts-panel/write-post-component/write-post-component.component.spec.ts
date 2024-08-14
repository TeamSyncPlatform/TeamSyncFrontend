import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePostComponentComponent } from './write-post-component.component';

describe('WritePostComponentComponent', () => {
  let component: WritePostComponentComponent;
  let fixture: ComponentFixture<WritePostComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WritePostComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritePostComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
