import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParceiroFilterComponent } from './parceiro-filter.component';

describe('ParceiroFilterComponent', () => {
  let component: ParceiroFilterComponent;
  let fixture: ComponentFixture<ParceiroFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParceiroFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParceiroFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
