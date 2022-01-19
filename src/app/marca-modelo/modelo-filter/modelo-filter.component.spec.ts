import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloFilterComponent } from './modelo-filter.component';

describe('ModeloFilterComponent', () => {
  let component: ModeloFilterComponent;
  let fixture: ComponentFixture<ModeloFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
