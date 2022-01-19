import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipamentoItemComponent } from './equipamento-item.component';

describe('EquipamentoItemComponent', () => {
  let component: EquipamentoItemComponent;
  let fixture: ComponentFixture<EquipamentoItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipamentoItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipamentoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
