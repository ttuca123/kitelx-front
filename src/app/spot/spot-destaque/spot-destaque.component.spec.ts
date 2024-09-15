import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDestaqueComponent } from './spot-destaque.component';

describe('SpotDestaqueComponent', () => {
  let component: SpotDestaqueComponent;
  let fixture: ComponentFixture<SpotDestaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotDestaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotDestaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
