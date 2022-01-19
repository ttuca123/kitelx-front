import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoProprietarioComponent } from './equipamento-proprietario.component';

describe('EquipamentoProprietarioComponent', () => {
  let component: EquipamentoProprietarioComponent;
  let fixture: ComponentFixture<EquipamentoProprietarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoProprietarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoProprietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
