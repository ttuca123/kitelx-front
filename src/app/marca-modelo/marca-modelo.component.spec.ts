import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaModeloComponent } from './marca-modelo.component';

describe('MarcaModeloComponent', () => {
  let component: MarcaModeloComponent;
  let fixture: ComponentFixture<MarcaModeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaModeloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
