import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaFilterComponent } from './marca-filter.component';

describe('MarcaFilterComponent', () => {
  let component: MarcaFilterComponent;
  let fixture: ComponentFixture<MarcaFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
