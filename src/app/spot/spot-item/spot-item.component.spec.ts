import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotItemComponent } from './spot-item.component';

describe('SpotItemComponent', () => {
  let component: SpotItemComponent;
  let fixture: ComponentFixture<SpotItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
