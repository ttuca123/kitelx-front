import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFiltroResumoVendasComponent } from './dialog-filtro-resumo-vendas.component';

describe('DialogFiltroResumoVendasComponent', () => {
  let component: DialogFiltroResumoVendasComponent;
  let fixture: ComponentFixture<DialogFiltroResumoVendasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogFiltroResumoVendasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFiltroResumoVendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
