import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeloItemComponent } from './modelo-item.component';

describe('ModeloItemComponent', () => {
  let component: ModeloItemComponent;
  let fixture: ComponentFixture<ModeloItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeloItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeloItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
