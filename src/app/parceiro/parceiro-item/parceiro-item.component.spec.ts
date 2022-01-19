import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroItemComponent } from './parceiro-item.component';

describe('ParceiroItemComponent', () => {
  let component: ParceiroItemComponent;
  let fixture: ComponentFixture<ParceiroItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
