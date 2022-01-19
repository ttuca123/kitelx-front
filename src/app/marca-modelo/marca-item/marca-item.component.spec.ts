import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaItemComponent } from './marca-item.component';

describe('MarcaItemComponent', () => {
  let component: MarcaItemComponent;
  let fixture: ComponentFixture<MarcaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
