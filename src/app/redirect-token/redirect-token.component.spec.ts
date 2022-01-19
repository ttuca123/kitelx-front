import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectTokenComponent } from './redirect-token.component';

describe('RedirectTokenComponent', () => {
  let component: RedirectTokenComponent;
  let fixture: ComponentFixture<RedirectTokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectTokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
